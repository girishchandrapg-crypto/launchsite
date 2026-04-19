import type { ContactFormData } from "@/types";
import { useMutation } from "@tanstack/react-query";

// Since backend.d.ts doesn't yet expose submitContact, we simulate with a delay
async function submitContactForm(_data: ContactFormData): Promise<void> {
  // Simulate network request
  await new Promise((resolve) => setTimeout(resolve, 800));
}

export function useSubmitContact() {
  return useMutation<void, Error, ContactFormData>({
    mutationFn: submitContactForm,
  });
}
