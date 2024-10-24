import { Box, Button, Typography } from "@mui/material";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";

type Tagged<A, T> = A & { __tag?: T };

type E164Number = Tagged<string, "E164Number">;

function Register() {
  const [phone, setPhone] = useState<E164Number | undefined>("");

  const [verified, setVerified] = useState(false);

  const onVerify = () => {
    setVerified(true);
  };

  return (
    <Box
      borderRadius="10px"
      bgcolor={"#f6f6f6"}
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {verified ? (
        <GetUserDetails />
      ) : (
        <VerifyPhoneNumber
          onVerify={onVerify}
          phone={phone}
          setPhone={setPhone}
        />
      )}
    </Box>
  );
}

export default Register;

type VerifyPhoneNumberProps = {
  onVerify: () => void;
  phone: E164Number | undefined;
  setPhone: Dispatch<SetStateAction<E164Number | undefined>>;
};

function VerifyPhoneNumber({
  onVerify,
  phone,
  setPhone,
}: Readonly<VerifyPhoneNumberProps>) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="35%"
      padding="20px"
      bgcolor="white"
    >
      <img
        style={{
          backdropFilter: "blur(5px)",
        }}
        src={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png"
        }
        alt="Logo"
        width={70}
      />

      <Typography
        variant="h5"
        fontWeight="900"
        letterSpacing={1}
        textAlign="center"
      >
        Welcome to WhatsApp
      </Typography>
      <Typography variant="subtitle1" color={"#8e8e8e"} textAlign="center">
        Explore our new features 👏
      </Typography>
      <Typography
        letterSpacing={1}
        variant="subtitle2"
        color={"primary"}
        textAlign="center"
      >
        Register to get started
      </Typography>

      <PhoneInput
        placeholder="Enter phone number"
        onChange={(value: E164Number) => {
          setPhone(value);
        }}
        style={{
          width: "70%",
          marginTop: "20px",
        }}
        defaultCountry="PK"
        international
        value={phone}
        limitMaxLength
      />

      <Button
        variant="contained"
        color="primary"
        onClick={onVerify}
        style={{
          marginTop: "20px",
          color: "white",
          width: "70%",
        }}
      >
        Continue
      </Button>
    </Box>
  );
}

function GetUserDetails() {
  return (
    <motion.div
      initial={{}}
      className="w-[80%] p-6 bg-white shadow-lg h-full"
    ></motion.div>
  );
}
