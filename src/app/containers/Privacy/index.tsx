import styled from "styled-components";

const Container = styled.div`
  font-family: "Arial, sans-serif";
  line-height: 1.6;
  color: #f1f1f1; /* Light text color */
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
  background: #2c2c2c; /* Dark background */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* Slightly darker shadow */
  border-radius: 8px;
`;

const Heading = styled.h1`
  font-size: 2.5em;
  color: #66aaff; /* Light blue for headings */
  margin-bottom: 20px;
  text-align: center;
`;

const SubHeading = styled.h2`
  font-size: 1.8em;
  color: #66aaff; /* Light blue for subheadings */
  margin-top: 30px;
  border-bottom: 2px solid #66aaff;
  padding-bottom: 5px;
`;

const SubSubHeading = styled.h3`
  font-size: 1.4em;
  color: #88ccff; /* Lighter blue for sub-subheadings */
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  font-size: 1em;
  margin: 10px 0;
  line-height: 1.8;
`;

const List = styled.ul`
  padding-left: 20px;
  list-style-type: disc;
  margin: 10px 0;
`;

const ListItem = styled.li`
  margin: 5px 0;
`;

const PrivacyPolicy = () => {
  return (
    <Container>
      <Heading>Privacy Policy</Heading>

      <SubHeading>Introduction</SubHeading>
      <Paragraph>
        Welcome to Pheva ("we", "our", "us"). We are committed to protecting and
        respecting your privacy. This Privacy Policy explains how we collect,
        use, disclose, and safeguard your information when you use our
        AI-powered virtual assistant app ("App"). Please read this policy
        carefully to understand our views and practices regarding your personal
        data and how we will treat it.
      </Paragraph>

      <SubHeading>Information We Collect</SubHeading>
      <SubSubHeading>Personal Information</SubSubHeading>
      <Paragraph>
        When you use our App, we may collect the following personal information:
      </Paragraph>
      <List>
        <ListItem>Name</ListItem>
        <ListItem>
          Contact information (e.g., email address, phone number)
        </ListItem>
        <ListItem>Location information</ListItem>
        <ListItem>Device information (e.g., device ID, IP address)</ListItem>
        <ListItem>Any other information you provide voluntarily</ListItem>
      </List>

      <SubSubHeading>Non-Personal Information</SubSubHeading>
      <Paragraph>
        We may also collect non-personal information that does not directly
        identify you, including:
      </Paragraph>
      <List>
        <ListItem>Browser type</ListItem>
        <ListItem>Language preference</ListItem>
        <ListItem>Referring site</ListItem>
        <ListItem>Date and time of each visitor request</ListItem>
        <ListItem>
          Any other non-personal information related to your use of our App
        </ListItem>
      </List>

      <SubHeading>How We Use Your Information</SubHeading>
      <Paragraph>
        We use the information we collect for the following purposes:
      </Paragraph>
      <List>
        <ListItem>
          To Provide Services: Including reading and sending emails as per your
          instructions, and managing your Google Calendar events.
        </ListItem>
        <ListItem>
          To Improve Our App: Understanding how you use the App to enhance its
          features and performance.
        </ListItem>
        <ListItem>
          To Communicate With You: Sending you updates, security alerts, and
          support messages.
        </ListItem>
        <ListItem>
          To Comply With Legal Obligations: Ensuring our compliance with
          applicable laws and regulations.
        </ListItem>
      </List>

      <SubHeading>Disclosure of Your Information</SubHeading>
      <Paragraph>
        We do not sell, trade, or otherwise transfer your personal information
        to third parties without your consent, except as described below:
      </Paragraph>
      <List>
        <ListItem>
          Service Providers: We may share your information with third-party
          service providers that perform services on our behalf, such as hosting
          and analytics.
        </ListItem>
        <ListItem>
          Legal Requirements: We may disclose your information if required to do
          so by law or in response to valid requests by public authorities.
        </ListItem>
      </List>

      <SubHeading>Data Security</SubHeading>
      <Paragraph>
        We use administrative, technical, and physical security measures to help
        protect your personal information. While we have taken reasonable steps
        to secure the personal information you provide to us, please be aware
        that despite our efforts, no security measures are perfect or
        impenetrable.
      </Paragraph>

      <SubHeading>Your Rights</SubHeading>
      <Paragraph>
        Depending on your location, you may have the following rights regarding
        your personal information:
      </Paragraph>
      <List>
        <ListItem>
          Access: The right to access the personal information we hold about
          you.
        </ListItem>
        <ListItem>
          Correction: The right to request that we correct any inaccuracies in
          your personal information.
        </ListItem>
        <ListItem>
          Deletion: The right to request the deletion of your personal
          information.
        </ListItem>
        <ListItem>
          Objection: The right to object to our processing of your personal
          information.
        </ListItem>
        <ListItem>
          Restriction: The right to request that we restrict the processing of
          your personal information.
        </ListItem>
        <ListItem>
          Portability: The right to request a copy of your personal information
          in a portable format.
        </ListItem>
      </List>
      <Paragraph>
        To exercise any of these rights, please contact us at{" "}
        <a href="mailto:yahyaparvar1@gmail.com">yahyaparvar1@gmail.com</a>.
      </Paragraph>

      <SubHeading>Changes to This Privacy Policy</SubHeading>
      <Paragraph>
        We may update this Privacy Policy from time to time to reflect changes
        in our practices or for other operational, legal, or regulatory reasons.
        We will notify you of any changes by updating the "Last Updated" date of
        this Privacy Policy. We encourage you to review this Privacy Policy
        periodically to stay informed about our information practices.
      </Paragraph>
    </Container>
  );
};

export default PrivacyPolicy;
