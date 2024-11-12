"use client"

import React, { SetStateAction } from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { FormControl, FormItem } from '../ui/form';

interface LikertRadioProps {
  setter: React.Dispatch<SetStateAction<string>>;
  scale: number;
  is_reversed: boolean;
  defaultValue?: string | null
}
let labels = ['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree']
export default function LikertRadio({setter, scale, is_reversed, defaultValue}:LikertRadioProps) {
  let content = Array.from({length: scale}).map((_, i) => (
    <FormItem key={`${Math.random().toString(16).slice(2)}-formItem`} className='flex items-center space-x-3 space-y-0'>
      <FormControl key={`${Math.random().toString(16).slice(2)}-formControl`}>
        <RadioGroupItem key={`${Math.random().toString(16).slice(2)}-radio`} value={`${i}`}/>
      </FormControl>
      <Label key={`${Math.random().toString(16).slice(2)}-labellikert`}>{labels[i]}</Label>
    </FormItem>
  ))
  if(is_reversed){
    content = Array.from({length: scale}).map((_, i) => (
      <FormItem key={`${Math.random().toString(16).slice(2)}-formItem`} className='flex items-center space-x-3 space-y-0'>
        <FormControl key={`${Math.random().toString(16).slice(2)}-formControl`}>
          <RadioGroupItem key={`${Math.random().toString(16).slice(2)}-radio`} value={`${i}`}/>
        </FormControl>
        <Label key={`${Math.random().toString(16).slice(2)}-labellikert`}>{labels[scale-(i+1)]}</Label>
      </FormItem>
    ))
  }

  return (
    <RadioGroup onValueChange={setter} defaultValue={defaultValue}>
      {content}
    </RadioGroup>
  )
}
