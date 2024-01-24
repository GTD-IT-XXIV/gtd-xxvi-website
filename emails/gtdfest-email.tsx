import {
  Body,
  Button,
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
  name: string;
  orders: {
    eventName: string;
    bundleName: string;
    timeslot: {
      startLabel: string;
      endLabel: string;
    };
    quantity: number;
    totalPrice: number;
  }[];
  orderPrice: number;
  url: string;
};

const baseUrl = "";

export default function GTDFestEmail(props: GTDFestEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your PINTU GTD Fest x Escape Room Tickets</Preview>

      <Body
        style={{
          fontFamily: "Arial,sans-serif",
          backgroundColor: "#ffffff",
        }}
      >
        <Container>
          <Section>
            <Row>
              <Column
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottom: "1px solid #cbd5e1",
                }}
              >
                <Img
                  src={`${baseUrl}/static/logo-gtd-normal.png`}
                  width="300"
                  height="75"
                  alt="PINTU Get Together Day Logo"
                  style={{ display: "inline", marginRight: "1rem" }}
                />
              </Column>
            </Row>
          </Section>
          <Section
            style={{
              padding: "2rem",
              textAlign: "center",
              paddingBottom: "3rem",
              borderBottom: "1px solid #cbd5e1",
            }}
          >
            <Text
              style={{
                fontSize: "1.25rem",
                fontWeight: 400,
                marginTop: 0,
                marginBottom: "0.5rem",
              }}
            >
              Hello {props.name}, here are your
            </Text>
            <Heading
              as="h2"
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                marginTop: 0,
                marginBottom: "2rem",
              }}
            >
              GTD Fest x Escape Room tickets!
            </Heading>
            <Button
              href={props.url}
              style={{
                whiteSpace: "nowrap",
                borderRadius: "0.375rem",
                backgroundColor: "#BE760F",
                padding: "1.25rem 2rem",
                filter:
                  "drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))",
              }}
            >
              <Text
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  color: "white",
                  margin: 0,
                }}
              >
                View Tickets
              </Text>
            </Button>
          </Section>
          <Section style={{ padding: "0.75rem 1rem" }}>
            <Heading as="h2" style={{ fontSize: "1.25rem", fontWeight: 600 }}>
              Order Details
            </Heading>
            <table
              align="center"
              width="100%"
              border={0}
              cellPadding={0}
              cellSpacing={10}
              role="presentation"
              style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
            >
              <thead style={{ width: "100%", fontWeight: 600 }}>
                <tr>
                  <Column style={tableHeader}>No.</Column>
                  <Column style={tableHeader}>Event</Column>
                  <Column style={tableHeader}>Bundle</Column>
                  <Column style={tableHeader}>Quantity</Column>
                  <Column style={tableHeader}>Total Price</Column>
                </tr>
              </thead>
              <tbody style={{ width: "100%" }}>
                {props.orders.map((order, idx) => (
                  <tr key={idx}>
                    <Column>{idx + 1}</Column>
                    <Column>{order.eventName}</Column>
                    <Column>{order.bundleName}</Column>
                    <Column>{order.quantity}</Column>
                    <Column>${order.totalPrice.toFixed(2)}</Column>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <Column colSpan={3} />
                  <Column style={{ ...tableFooter, fontWeight: 600 }}>
                    Total
                  </Column>
                  <Column
                    style={{
                      ...tableFooter,
                      fontWeight: 400,
                      fontSize: "1.25rem",
                    }}
                  >
                    ${props.orderPrice.toFixed(2)}
                  </Column>
                </tr>
              </tfoot>
            </table>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const tableHeader: CSSProperties = {
  paddingBottom: "0.4rem",
};

const tableFooter: CSSProperties = {
  paddingTop: "0.4rem",
};
