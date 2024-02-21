/* import "./App.css";
import { useState } from "react";
import { validateEmail } from "./utils";
import { IconButton, CloseButton, Text, Checkbox, Divider, VStack, Box, Flex, HStack, Button } from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 */
const PasswordErrorMessage = () => {
  return (
    <p className="FieldError">Password should have at least 8 characters</p>
  );
};
const EmailErrorMessage = () => {
  return (
    <p className="FieldError">Please type a valid email address</p>
  );
};
const FNameErrorMessage = () => {
  return (
    <p className="FieldError">First name should have at least 2 characters</p>
  );
};
const LNameErrorMessage = () => {
  return (
    <p className="FieldError">Please type your last name</p>
  );
};

const Signup = ({accts}) => {
  const [firstName, setFirstName] = useState({
    value: "",
    isTouched: false
  });
  const [lastName, setLastName] = useState({
    value: "",
    isTouched: false
  });
  const [email, setEmail] = useState({
    value: "",
    isTouched: false
  });
  const [password, setPassword] = useState({
    value: "",
    isTouched: false
  });
  const [submit, setSubmitted] = useState(false);

  const getIsFormValid = () => {
    // Validate form
    return (
    firstName.value.length >= 2 &&
    lastName.value &&
    validateEmail(email.value) &&
    password.value.length >= 8
    )
  };

  let username = window.localStorage.getItem("lastInput") ?? firstName.value;
  window.localStorage.setItem("lastInput", firstName.value);

  const clearForm = () => {
    // reset form after submit
    setFirstName({ value: "", isTouched: false })
    setLastName({ value: "", isTouched: false })
    setEmail({ value: "", isTouched: false })
    setPassword({ value: "", isTouched: false })
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Thanks for creating an account", firstName.value, "!")
    setSubmitted(true);
    /* clearForm(); */
  };

  const [show, setShow] = useState(false)
  const handlePw = () => setShow(!show)

  return (
    <Flex py={20} width='full' height={850} align='center' justify='center'>
    <Box
    className='signup'
    as='section'
    color="#333"
    maxWidth="1280px"
    left={0}
    right={0}
    p={12}
    mt={6}
    bg='white'
    rounded='xl'
    w='500'
    boxShadow='dark-lg'
    >
    {!submit ? (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <HStack justify='space-between'>
          <h2>Sign Up</h2>
          <CloseButton size='md' ml={260}
        as='a'
        href='/'
        variant='ghost'
        aria-label='Close icon'
        />
        </HStack>
        <HStack>
            <Text>Already have an account?</Text>
            <Text as='a' href='login' color='blue' cursor='pointer'>Sign in!</Text>
        </HStack>
          <div className="Field">
            <label>
              First name <sup>*</sup>
            </label>
            <input
              id="firstname"
              type="text"
              name="first name"
              placeholder="First name"
              value={firstName.value}
              onChange={(e)=> {
                setFirstName({...firstName, value:e.target.value})
              }}
              /* minLength={2}
              required */
              onBlur={() => {
                setFirstName({...firstName, isTouched: true})
              }}
              /* validate={(value) => {
                let error;
                if (value.length < 2 ){
                  error = 'Please enter a valid name.'
                }
                return error;
              }} */
            />
            {firstName.isTouched && firstName.value.length < 2 ? (<FNameErrorMessage/>): null}
          </div>
          <div className="Field">
            <label>
              Last name <sup>*</sup>
            </label>
            <input
              id="last name"
              type="text"
              name="last name"
              placeholder="Last name"
              value={lastName.value}
              /* minLength={2}
              required */
              onChange={(e)=> {
                setLastName({...lastName, value:e.target.value})
              }}
              onBlur={() => {
                setLastName({...lastName, isTouched: true})
              }}
              />
              {lastName.isTouched && !lastName.value ? (<LNameErrorMessage/>): null}
          </div>
          <div className="Field">
            <label>
              Email address <sup>*</sup>
            </label>
            <input
              id="Email"
              type="email"
              name="Email"
              placeholder="Email address"
              value={email.value}
              onChange={(e)=> {
                setEmail({...email, value:e.target.value})
              }}
              /* required */
              onBlur={() => {
                setEmail({...email, isTouched: true})
              }}
              />
              {email.isTouched && !validateEmail(email.value) ? (<EmailErrorMessage/>): null}
          </div>
          <div className="Field">
            <label>
              Password <sup>*</sup>
            </label>
            <Flex background='#edf2f7' borderRadius='4px'>
            <input
              id="Pw"
              type={show ? 'text' : 'password'}
              name="Pw"
              placeholder="Password"
              value={password.value}
              /* required */
              onChange={(e) => {
                setPassword({...password, value: e.target.value })
              }}
              onBlur={() => {
                setPassword({...password, isTouched: true})
              }}
              />
              <IconButton
                  aria-label='View password icon'
                  onClick={handlePw}
                  size='sm'
                  variant='ghost'
                  width={4}
                  alignSelf="center"
                  >
                    {show ? <ViewOffIcon/>:<ViewIcon/>}
                  </IconButton>
            {password.isTouched && password.value.length < 8 ? (<PasswordErrorMessage/>): null}
            </Flex>
          </div>
          <Checkbox>
            Remember me?
          </Checkbox>
          <button className="signup-btn2" type="submit" disabled={!getIsFormValid()}>Create account</button>
        </fieldset>
        {/* <Divider className='divi'/> */}
        {/* <hr className='divi'/> */}
          <VStack spacing={4} align='center' justify='center'>
          <Text align='center' justify='center'>
            or sign up with
          </Text>
          <HStack gap={2}>
              {data.map((acct) =>(
                <a key={acct.url} href={acct.url} rel='navicons'>
                  <FontAwesomeIcon  className='link2' icon={acct.icon} color='black' size="2x"/>
                </a>
              ))}
            </HStack>
          </VStack>
      </form>
    </div>
    ) : (
    <VStack>
    <h2>Thanks for creating an account {firstName.value} !</h2>
    <Text  as='h4' align='center' justify='center'>
      Email: {email.value}
    </Text>
    <Text as='h4' align='center' justify='center'>
      Password: {password.value}
    </Text>
    <Button as='a' href='/login' mt='4' id="login-btn2" boxShadow='dark-lg' justifySelf="center" fontWeight='bold' fontSize={18} size={['sm','md','lg']} rounded='15px'>
      Log in
    </Button>
    </VStack>
    )
  }
    </Box>
    </Flex>
    )
}
export default Signup;
