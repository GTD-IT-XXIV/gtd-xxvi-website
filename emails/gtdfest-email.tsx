import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { type CSSProperties } from "react";

export type GTDFestEmailProps = {
  tickets: {
    id: string;
    qrPath: string;
    event: {
      name: string;
      location: string;
    };
    bundle: string;
    timeslot: string;
  }[];
  name: string;
};

const baseUrl = "";

export default function GTDFestEmail({
  tickets = [],
  name = "",
}: GTDFestEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>PINTU Get Together Day Fest x Escape Room Tickets</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section>
            <Row>
              <Column>
                <Img
                  src={`${baseUrl}/static/logo-gtd-black-transparent.png`}
                  alt="PINTU Get Together Day Logo"
                  height={56}
                  width={56}
                />
              </Column>
              <Column align="right">
                <Heading as="h1">Your Tickets</Heading>
              </Column>
            </Row>
          </Section>
          <Section>
            <Text>
              Hello {name}, below are your tickets for PINTU Get Together Day
              Fest x Escape Room.
            </Text>
          </Section>
          <Section>
            {tickets.map((ticket) => (
              <Row key={ticket.id} style={styles.ticket}>
                <Column>
                  <Img
                    src={`${baseUrl}${ticket.qrPath}`}
                    alt="QR Code"
                    height={80}
                    width={80}
                  />
                </Column>
                <Column>
                  <Section>
                    <Row>
                      <Column>Event:</Column>
                      <Column>{ticket.event.name}</Column>
                    </Row>
                    <Row>
                      <Column>Location:</Column>
                      <Column>{ticket.event.location}</Column>
                    </Row>
                    <Row>
                      <Column>Bundle:</Column>
                      <Column>{ticket.bundle}</Column>
                    </Row>
                    <Row>
                      <Column>Timeslot:</Column>
                      <Column>{ticket.timeslot}</Column>
                    </Row>
                  </Section>
                </Column>
              </Row>
            ))}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles: Record<string, CSSProperties> = {
  body: {
    backgroundColor: "white",
    fontFamily: "sans-serif",
  },
  ticket: {
    padding: "0.5rem 1rem",
    border: "1px solid #64748b",
    borderRadius: "0.5rem",
  },
};
