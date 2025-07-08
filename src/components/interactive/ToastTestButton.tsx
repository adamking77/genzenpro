// import React from 'react'; // Removed as React is not explicitly used
import { Button } from '../ui/button'; // Adjusted path
import { useToast } from '../ui/use-toast'; // Adjusted path

export function ToastTestButton() {
  const { toast } = useToast();
  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({ title: "Test Toast", description: "This is a test toast message." });
      }}
    >
      Show Test Toast
    </Button>
  );
}

export default ToastTestButton;