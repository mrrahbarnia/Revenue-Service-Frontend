import { RocketIcon } from "@radix-ui/react-icons"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
 
export function AlertDemo({title, description}) {
  return (
    <Alert className="max-w-md mx-2.5">
      <AlertTitle className="font-[Vazir-Medium] text-green-700">{title}</AlertTitle>
      <AlertDescription className="font-[Vazir-Regular] text-green-700">
        {description}
      </AlertDescription>
    </Alert>
  )
};