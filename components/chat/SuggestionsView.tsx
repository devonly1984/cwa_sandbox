import { suggestions } from "@/lib/constants/suggestions"
import { Button } from "../ui/button"

const SuggestionsView = () => {
  return (
       <div className="flex flex-wrap justify-center gap-2">
        {suggestions.map((suggestion) => (
          <Button
            key={suggestion.label}
            variant={"outline"}
            size="sm"
            className={"rounded-full font-normal text-muted-foreground"}
          >
            <suggestion.icon />
            {suggestion.label}
          </Button>
        ))}
      </div>
  )
}
export default SuggestionsView