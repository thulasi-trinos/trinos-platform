import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components';

export interface WelcomeEmailProps {
  name: string;
  loginUrl: string;
}

export function WelcomeEmail({ name, loginUrl }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Trinos account is ready</Preview>
      <Body style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#F9FAFB' }}>
        <Container style={{ padding: '24px' }}>
          <Heading as="h1">Welcome to Trinos, {name}</Heading>
          <Text>Your account is ready. Submit your first daily status report to get started.</Text>
          <Button
            href={loginUrl}
            style={{ background: '#4F46E5', color: '#fff', padding: '10px 16px', borderRadius: 6 }}
          >
            Sign in
          </Button>
        </Container>
      </Body>
    </Html>
  );
}

export default WelcomeEmail;
