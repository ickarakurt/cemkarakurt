---
author: Cem Karakurt
pubDatetime: 2024-10-22T20:00:00Z
modDatetime: 2024-10-22T20:00:00Z
title: NextJS Server Actions with Zod and React Hook Form
slug: nextjs-server-actions-zod-react-hook-form
featured: true
draft: false
tags:
  - react
  - nextjs
  - frontend
  - backend
description: Simple usage of Zod and React Hook Form with NextJS server actions.
---

# NextJS Server Actions with Zod and React Hook Form

When building forms in [NextJS](https://cemkarakurt.com/tags/nextjs/ "NextJS"), it's essential to handle both client-side and server-side validations. By combining Zod with React Hook Form, you can ensure that your forms are validated on the client-side and then processed securely on the server-side.

## Version Compatibility

- **NextJS**: 14.x

## Server Action

```typescript
"use server";

// The server action responsible for updating the user's profile
export async function updateUserProfileAction(
  formData: FormData
): Promise<FormActionResponse<{ username: string }> | undefined> {
  const session = await auth(); // Retrieve the user's session
  const userId = session?.user?.id; // Extract user ID from session

  await checkAuth(session); // Ensure the user is authenticated

  const rawFormData = {
    username: formData.get("username") as string, // Extract the username field from the form
  };

  try {
    // Validate the form data using the defined schema
    const validatedFields = UserProfileUpdateSchema.parse(rawFormData);

    // Update the user's profile with the validated data
    await updateUserProfile({
      userId,
      username: validatedFields.username,
    });

    // Revalidate the path to clear the cache after the update
    revalidatePath("/settings");

    // Return the updated username to the client-side
    return {
      data: { username: validatedFields.username },
      errors: null,
    };
  } catch (error) {
    // Handle validation errors from Zod
    if (error instanceof z.ZodError) {
      return {
        errors: transformZodErrors(error),
        data: null,
      };
    }

    // Handle other types of errors (e.g., unexpected server errors)
    if (error instanceof Error) {
      return {
        data: null,
        errors: [{ path: "user", message: "Unable to update user" }],
      };
    }
  }
}
```

- `auth()`: This function checks the user's session for authentication.
- `revalidatePath()`: Used to refresh the cached data for the specific path to keep the UI in sync with the latest updates.
- `transformZodErrors()`: A helper to format Zod validation errors for easier handling.

## Form Schema

```ts
import { z } from "zod";

// Zod schema to validate user profile data
export const UserProfileUpdateSchema = z.object({
  username: z.string().min(3).max(20), // Ensure username is between 3 and 20 characters
});

export type UserProfileUpdateSchema = z.infer<typeof UserProfileUpdateSchema>;
```

- `z.string().min(3).max(20)`: Ensures the `username` is a string between 3 and 20 characters long.
- `z.infer`: This helps derive the TypeScript type from the Zod schema for usage in forms.

## Form Component

```tsx
"use client";

export const UserProfileUpdateForm = ({ username }: { username: string }) => {
  // Initialize the React Hook Form hook with validation resolver
  const form = useForm<UserProfileUpdateSchema>({
    resolver: zodResolver(UserProfileUpdateSchema), // Integrate Zod with React Hook Form
    defaultValues: {
      username, // Prefill the form with the current username
    },
  });

  const {
    register, // Register form inputs
    handleSubmit, // Function to handle form submission
    formState: { errors, isSubmitting }, // Track form errors and submission state
  } = form;

  const onSubmitForm: SubmitHandler<UserProfileUpdateSchema> = async data => {
    const formData = new FormData();
    formData.append("username", data.username); // Convert data to FormData for server action

    // Call the server action to update the user profile
    const submission = await updateUserProfileAction(formData);

    // Handle errors if they occur
    if (submission?.errors) {
      // Display error messages or handle them accordingly
    } else {
      // Handle successful update (e.g., show a success message)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Label htmlFor="username">Username</Label>
      <Input
        id="username"
        {...register("username")} // Register the input field
      />
      <div>{errors.username && errors.username.message}</div> // Display
      validation error for username
      <Button disabled={isSubmitting} type="submit" className="mt-3">
        {isSubmitting ? "Updating..." : "Update"} // Show loading state on
        submit
      </Button>
    </form>
  );
};
```

- `zodResolver`: Integrates Zod validation with React Hook Form to handle validation.
- `handleSubmit`: Submits the form and runs validation.
- `register`: Registers form inputs with React Hook Form.
- `isSubmitting`: Disables the submit button while the form is processing.

### Key Components:

- **Label**: An accessible label for form fields.
- **Input**: Input fields bound to the form using `register`.
- **Button**: A submit button that disables when submitting.

## Final Thoughts

This approach ensures that your [NextJS](https://cemkarakurt.com/tags/nextjs/ "NextJS") form validations are handled both on the server-side (with Zod) and client-side (React Hook Form), providing robust and seamless [user experiences](https://cemkarakurt.com/tags/user-experience/ "user experience").
