import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
    Tailwind,
} from '@react-email/components';

interface AutoReplyEmailProps {
    name: string;
    message: string;
}

export const AutoReplyEmail = ({
    name,
    message,
}: AutoReplyEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Thank you for reaching out, {name}!</Preview>
            <Tailwind>
                <Body style={{ backgroundColor: '#000000', color: '#ffffff', fontFamily: 'sans-serif' }}>
                    <Container style={{ margin: '0 auto', padding: '20px 0 48px', maxWidth: '600px' }}>
                        <Section style={{ padding: '24px', border: '1px solid #333', borderRadius: '8px', backgroundColor: '#111' }}>
                            <Heading style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 20px', color: '#ffffff' }}>
                                Message Received
                            </Heading>

                            <Text style={{ fontSize: '16px', lineHeight: '26px', color: '#dddddd' }}>
                                Hi {name},
                            </Text>

                            <Text style={{ fontSize: '16px', lineHeight: '26px', color: '#dddddd' }}>
                                Thank you for reaching out! I've received your message and will get back to you as soon as possible.
                            </Text>

                            <Hr style={{ borderColor: '#333', margin: '20px 0' }} />

                            <Text style={{ fontSize: '14px', color: '#a3a3a3', fontWeight: 'bold', marginBottom: '8px' }}>
                                What you sent:
                            </Text>

                            <Text style={{
                                fontSize: '14px',
                                lineHeight: '24px',
                                color: '#cccccc',
                                padding: '16px',
                                backgroundColor: '#0a0a0a',
                                borderRadius: '6px',
                                borderLeft: '2px solid #3b82f6',
                                fontStyle: 'italic',
                                whiteSpace: 'pre-wrap'
                            }}>
                                {message}
                            </Text>

                            <Hr style={{ borderColor: '#333', margin: '20px 0' }} />

                            <Text style={{ fontSize: '14px', lineHeight: '24px', color: '#888888', marginTop: '32px' }}>
                                Best regards,<br />
                                <span style={{ color: '#ffffff', fontWeight: 'bold' }}>Devin DeMatto</span><br />
                                <a href="https://devindematto.dev" style={{ color: '#3b82f6', textDecoration: 'none' }}>devindematto.dev</a>
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default AutoReplyEmail;
