import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Input, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Slide,
} from "@chakra-ui/react";
import { AuthContext } from "../Context/AuthContext";
import { ChevronRightIcon } from "@chakra-ui/icons";

export const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const { isAuth, setIsAuth } = useContext(AuthContext);
 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
     
      let usersData = await fetch(
        `https://blue-mercury-3qiw.onrender.com/Users?email=${userData.email}&password=${userData.password}`
      );
      usersData = await usersData.json();
      
      localStorage.setItem("bluemercury-token", usersData[0].userToken);
      setIsAuth({ ...isAuth, data: usersData[0], loggedin: true });

      setSuccess(true);
     
      setTimeout(() => {
        
        setSuccess(false);
        navigate("/");
      }, 3000);
    } catch (error) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      return;
    }
  };
  useEffect(() => {
    document.querySelector("title").innerText = "Login | bluemercury";
  }, []);
  return (
    <>
    <Box ml="10">
    <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
  <BreadcrumbItem>
    <BreadcrumbLink href='/'>Home</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem>
    <BreadcrumbLink href='/login'>LogIn</BreadcrumbLink>
  </BreadcrumbItem>

 
</Breadcrumb>
</Box>
      <Slide
        in={alert}
        direction="left"
        position="fixed"
        top="0px"
        style={{ zIndex: 10 }}
        bg="white"
      >
        <Alert status="error" w="80vw" mx="10vw" mt="50px" flexWrap="wrap">
          <AlertIcon />
          <AlertTitle>User with given credentials doesn't exist!</AlertTitle>
          <AlertDescription>Try signing up.</AlertDescription>
        </Alert>
      </Slide>
      <Slide
        in={success}
        direction="left"
        position="fixed"
        top="0px"
        style={{ zIndex: 10 }}
      >
        <Alert status="success" w="80vw" mx="10vw" mt="50px" flexWrap="wrap">
          <AlertIcon />
          <AlertTitle>Logged In Succesfully!</AlertTitle>
          <AlertDescription>Redirecting to Home page</AlertDescription>
        </Alert>
      </Slide>
      <Box w={["280px", "460px"]} m="auto" mt="65px" mb="140px" zIndex={1}>
        <Heading
          color="#12284c"
          letterSpacing="2px"
          fontSize="37px"
          fontWeight="400"
          textAlign="center"
        >
          LOGIN
        </Heading>
        <Text
          textAlign="center"
          color="#12284c"
          mt="20px"
          fontSize="19px"
          fontWeight="300"
        >
          Please enter your e-mail and password.
        </Text>
        <form onSubmit={handleLogin}>
          <Box
            border="1px solid black"
            mt="20px"
            p="7px 14px"
            _hover={{ borderColor: "blue" }}
          >
            <Input
              variant="unstyled"
              placeholder="Email"
              borderRadius="0px"
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              required
            />
          </Box>
          <Box
            mt="15px"
            p=" 7px 14px"
            display="flex"
            border="1px solid black"
            _hover={{ borderColor: "blue" }}
          >
            <Input
              placeholder="Password"
              variant="unstyled"
              type="password"
              borderRadius="0px"
              required
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            <Text
              cursor="pointer"
              textDecoration="underline"
              fontSize="14px"
              whiteSpace="nowrap"
              color="gray"
            >
              Forgot Password?
            </Text>
          </Box>
          <Input
            type="submit"
            value="LOGIN"
            bg="#12284c"
            
            color="white"
            borderRadius="0px"
            mt="15px"
            border="1px solid #12284c"
            fontWeight="500"
            cursor="pointer"
          />
        </form>
        <Box display="flex" justifyContent="center" mt="20px">
          <Text fontSize="14px" color="#12284c" fontWeight="400">
            Don't have an account? &nbsp;
          </Text>
          <Link to="/signup">
            <Text
              cursor="pointer"
              textDecoration="underline"
              fontSize="14px"
              color="#12284c"
              fontWeight="500"
            >
              Create one
            </Text>
          </Link>
        </Box>
      </Box>
    </>
  );
};
