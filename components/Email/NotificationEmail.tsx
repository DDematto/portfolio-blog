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

interface NotificationEmailProps {
    name: string;
    email: string;
    message: string;
}

export const NotificationEmail = ({
    name,
    email,
    message,
}: NotificationEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Incoming Message from {name}</Preview>
            <Tailwind>
                <Body style={{ backgroundColor: '#09090b', color: '#fafafa', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    <Container style={{ margin: '0 auto', padding: '40px 20px', maxWidth: '600px' }}>

                        {/* Header Box */}
                        <Section style={{ textAlign: 'center', marginBottom: '32px' }}>
                            <Text style={{
                                margin: '0 auto',
                                backgroundColor: '#c22902', // theme-700 equivalent
                                color: '#ffffff',
                                padding: '6px 14px',
                                borderRadius: '9999px',
                                fontSize: '12px',
                                fontWeight: '600',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                display: 'inline-block'
                            }}>
                                Portfolio Contact Request
                            </Text>
                            <Heading style={{ fontSize: '28px', fontWeight: '800', marginTop: '24px', marginBottom: '8px', color: '#ffffff' }}>
                                You have a new message.
                            </Heading>
                            <Text style={{ fontSize: '16px', color: '#a1a1aa', margin: 0 }}>
                                Someone reached out via the contact form on your portfolio.
                            </Text>
                        </Section>

                        {/* Main Content Box */}
                        <Section style={{ padding: '32px', border: '1px solid #27272a', borderRadius: '12px', backgroundColor: '#18181b', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
                            <Section style={{ marginBottom: '24px' }}>
                                <Text style={{ fontSize: '13px', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0', fontWeight: 'bold' }}>Sender</Text>
                                <Text style={{ fontSize: '16px', color: '#ffffff', margin: '0 0 16px 0', fontWeight: '500' }}>{name}</Text>

                                <Text style={{ fontSize: '13px', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0', fontWeight: 'bold' }}>Email Address</Text>
                                <Text style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#ff7832', fontWeight: '500' }}>
                                    {email}
                                </Text>
                            </Section>

                            <Hr style={{ borderColor: '#27272a', margin: '16px 0', borderWidth: '1px' }} />

                            {/* The Message */}
                            <Text style={{ fontSize: '13px', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 12px 0', fontWeight: 'bold' }}>Message</Text>
                            <Section style={{
                                padding: '20px',
                                backgroundColor: '#09090b',
                                borderRadius: '8px',
                                borderLeft: '4px solid #f95606', // theme-500 equivalent
                            }}>
                                <Text style={{
                                    fontSize: '15px',
                                    lineHeight: '26px',
                                    color: '#e4e4e7',
                                    margin: 0,
                                    whiteSpace: 'pre-wrap'
                                }}>
                                    {message}
                                </Text>
                            </Section>

                        </Section>

                        <Text style={{ textAlign: 'center', fontSize: '13px', color: '#71717a', marginTop: '32px' }}>
                            Sent securely from devindematto.dev
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default NotificationEmail;
