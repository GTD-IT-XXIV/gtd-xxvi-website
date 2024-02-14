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

export type GTDMerchEmailProps = {
  orderId: string;
  name: string;
  bundles: {
    name: string;
    quantity: number;
    totalPrice: number;
    items: {
      name: string;
      variation: string;
    }[];
  }[];
  orderPrice: number;
};

export default function GTDMerchEmail(props: GTDMerchEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Order for Merchandise Sale</Preview>

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
                  src="https://utfs.io/f/9611670a-f83f-4396-978c-b60167c134ab-tvogcf.png"
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
              Hi {props.name}! Here is your order for
            </Text>
            <Heading
              as="h2"
              style={{
                fontSize: "1.75rem",
                fontWeight: 600,
                marginTop: 0,
                marginBottom: "2rem",
              }}
            >
              Merchandise Sale
            </Heading>
          </Section>
          <Section style={{ padding: "0.75rem 1rem" }}>
            <Heading as="h2" style={{ fontSize: "1.5rem", fontWeight: 600 }}>
              Order Details (ID: {props.orderId})
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
                  <Column style={tableHeader}>Bundle</Column>
                  <Column style={tableHeader}>Item</Column>
                  <Column style={tableHeader}>Quantity</Column>
                  <Column style={tableHeader}>Total Price</Column>
                </tr>
              </thead>
              <tbody style={{ width: "100%" }}>
                {props.bundles.map((item, idx) => (
                  <tr key={idx}>
                    <Column>{idx + 1}</Column>
                    <Column>{item.name}</Column>
                    <Column>
                      {item.items.map((merch) => (
                        <>
                          {merch.name}: {merch.variation}
                          <br />
                        </>
                      ))}
                    </Column>
                    <Column>{item.quantity}</Column>
                    <Column>${item.totalPrice.toFixed(2)}</Column>
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
