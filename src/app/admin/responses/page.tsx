"use client";
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import getIndividualResponse from '@/utils/custom/analytics/getIndividualResponse';
import { FormResponse } from '@/types/database/response';
import {LoadingSpinner} from '@/components/LoadingSpinner';
import { Question } from '@/types/database/questions';
import getQuestions from '@/utils/custom/questions/getQuestions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ResponsePage() {
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState<FormResponse[]>();
  const [questions, setQuestions] = useState<Question[]>();
  const searchParams = useSearchParams();
  const stringData = searchParams.get("data");
  const parsedData = JSON.parse(stringData);

  useEffect(() => {
    async function getResponseData() {
      const responseData = await getIndividualResponse(parsedData.date_answered, parsedData.user_email);
      console.log(responseData);
      setResponses(responseData);
      const questions = await getQuestions();
      setQuestions(questions);
      console.log(questions);
      setLoading(false);
    }
    getResponseData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  function sortResponses(a, b) {
    if (a.question_id < b.question_id) {
      return -1;
    }
    if (a.question_id > b.question_id) {
      return 1;
    }
    return 0;
  }

  function sortQuestions(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }

  questions.sort(sortQuestions);
  responses.sort(sortResponses);

  const interpretations = ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'];
  const inversedInterprestations = ['Strongly Disagree', 'Disagree', 'Agree', 'Strongly Agree'];

  const combinedData = responses.map((x, i) => ({
    response_value: x.response_value,
    question_statement: questions[i].question,
    interpretation: questions[i].is_reversed
      ? inversedInterprestations[x.response_value]
      : interpretations[x.response_value],
  }));

  console.log(combinedData);

  return (
    <div className="flex p-10 flex-col gap-y-8 bg-gray-50 rounded-lg shadow-lg">
        
      {/* Back button */}
      <Link href={`${process.env.NEXT_PUBLIC_URL}/admin`}>
        <Button className="mb-4">&lt; Back</Button>
      </Link>

      {/* User Info */}
      <div className="p-6 bg-white rounded-lg shadow-lg mb-6 border border-[#93C5FD]">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-[#1E3A8A]">{parsedData.user_email}</h1>
          <h2 className="text-xl font-semibold text-[#1E3A8A]">{parsedData.userName}</h2>
        </div>
      </div>

      {/* Questions and responses */}
      <div className="p-6 bg-white rounded-lg shadow-lg border border-[#93C5FD]">
        <div className="flex flex-row justify-between text-sm font-medium text-gray-700 mb-4 border-b pb-2">
          <div className="font-semibold">Question</div>
          <div className="font-semibold">Response</div>
        </div>

        {/* list */}
        <div className="space-y-4">
          {combinedData.map((x) => (
            <div
              key={`${Math.random().toString(16).slice(2)}-response`}
              className="flex flex-row justify-between items-center p-4 bg-white rounded-md shadow-sm border border-[#93C5FD] hover:bg-gray-100 transition-colors"
            >
              <div className="text-gray-800">{x.question_statement}</div>
              <div className="text-gray-600">{x.interpretation}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
