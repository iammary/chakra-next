import React from 'react';
import { FormControl, Input, FormErrorMessage, Button, Center, VStack, Heading, CenterProps, ButtonGroup } from '@chakra-ui/react';
import { Field, FieldAttributes, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useLocalStorage } from 'usehooks-ts';
import { AUTH_LOCAL_STORAGE_KEY } from '@/constants';

const AuthSchema = Yup.object().shape({
  username: Yup.string().required('Username is required.'),
  jobTitle: Yup.string().required('Job title is required.'),
});

export interface AuthenticationFormProps extends Pick<CenterProps, 'h'> {}

const NO_USER = { username: '', jobTitle: '' };

const AuthenticationForm: React.FC<AuthenticationFormProps> = props => {
  const [user, setUser] = useLocalStorage(AUTH_LOCAL_STORAGE_KEY, NO_USER);

  const isExisting = user.username && user.jobTitle;

  return (
    <Center padding="4" {...props}>
      <Formik
        initialValues={user}
        validationSchema={AuthSchema}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            actions.setSubmitting(false);
            setUser(values);
          }, 300);
        }}>
        {props => (
          <Form>
            <VStack gap={4}>
              <Heading as="h6" size="xs">
                {user.username ? `Update your profile below.` : 'Please fill' + ' in the details to' + ' access the app.'}
              </Heading>
              <Field name="username">
                {({ field, form }: FieldAttributes<any>) => (
                  <FormControl isInvalid={form.errors.username && form.touched.username}>
                    <Input {...field} placeholder="Username" />
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="jobTitle">
                {({ field, form }: FieldAttributes<any>) => (
                  <FormControl isInvalid={form.errors.jobTitle && form.touched.jobTitle}>
                    <Input {...field} placeholder="Job Title" />
                    <FormErrorMessage>{form.errors.jobTitle}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <ButtonGroup>
                <Button colorScheme="teal" isLoading={props.isSubmitting} type="submit">
                  {isExisting ? 'Update' : 'Submit'}
                </Button>
                {isExisting && (
                  <Button variant="outline" colorScheme="red" onClick={() => setUser(NO_USER)}>
                    Logout
                  </Button>
                )}
              </ButtonGroup>
            </VStack>
          </Form>
        )}
      </Formik>
    </Center>
  );
};

export default AuthenticationForm;
