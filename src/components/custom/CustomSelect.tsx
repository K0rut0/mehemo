import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type SelectContent = {
    value: string | boolean | number;
    text: string;
};

interface CustomSelectParams {
    placeholder: string;
    content: SelectContent[];
    setter: Function;
}

export default function CustomSelect(params: CustomSelectParams) {
    return (
        <Select onValueChange={(x) => params.setter(x)}>
            <SelectTrigger>
                <SelectValue placeholder={params.placeholder} />
            </SelectTrigger>
            <SelectContent>
                {params.content.map((content, i) => (
                    <SelectItem key={`${Math.random().toString(16).slice(2)}-Select`} value={content.value as string}>
                        {content.text}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
