const { Button } = require("@/components/ui/button");
const { Loader2Icon } = require("lucide-react");

const SubmitButton = ({ isPending }) => {
  return (
    <>
      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <></>
        )}
        {isPending ? "Submitting..." : "Submit"}
      </Button>
    </>
  );
};

export default SubmitButton;
