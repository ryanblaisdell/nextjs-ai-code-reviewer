'use client';

import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { GoogleButton } from './GoogleButton';
import { useForm } from '@mantine/form';
import { upperFirst, useToggle } from '@mantine/hooks';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import bcrypt from 'bcryptjs';

export function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register']);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  //const { setEmail } = useApplicationStore();

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },
    validate: {
      email: (val) => (/^\S+@\S+\.\S+$/.test(val) ? null : 'Invalid email format'),
      password: (val) =>
        val.length < 6 ? 'Password should include at least 6 characters' : null,
    },
  });

  const handleSubmit = async () => {
    setLoading(true);
    setFormError(null);

    if (type === 'login') {
      const result = await signIn('credentials', {
        redirect: false,
        email: form.values.email,
        password: form.values.password,
      });

      if (result?.error) {
        setFormError(result.error);
      } else if (result?.ok) {
        // If login is successful, redirect manually
        //setEmail(form.values.email);
        router.push('/');
        router.refresh();
      }
    } else {
      // if type == 'register'
      try {
        const hashedPassword = await bcrypt.hash(form.values.password, 10)

        const response = await fetch('/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: form.values.name,
            email: form.values.email,
            password: hashedPassword,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          const loginResult = await signIn('credentials', {
            redirect: false,
            email: form.values.email,
            password: form.values.password,
          });

          if (loginResult?.error) {
            setFormError(loginResult.error);
          } else if (loginResult?.ok) {
            //setEmail(form.values.email);
            router.push('/chat');
            router.refresh();
          }
        } else {
          setFormError(data.error || 'Registration failed.');
        }
      } catch (error) {
        console.error('Registration API error:', error);
        setFormError('An unexpected error occurred during registration.');
      }
    }
    setLoading(false);
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <Paper radius="md" p="lg" withBorder {...props} className="text-white" style={{ backgroundColor: "#364153"}}>
      <Text size="lg" fw={500}>
        Welcome, {upperFirst(type)} with
      </Text>

      <Group grow mb="md" mt="md">
        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl" onClick={handleGoogleSignIn}>Google</GoogleButton>
        </Group>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      {formError && (
        <Text color="red" size="sm" ta="center" mb="md">
          {formError}
        </Text>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
              error={form.errors.name}
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="sammy@example.com"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Macaroni123"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password}
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              error={form.errors.terms}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" c="white" onClick={() => toggle()} size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl" loading={loading}>
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}