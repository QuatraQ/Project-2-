import { useState } from 'react'
import { trpc } from '../../lib/trpc'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { zSignUpTrpcInput } from '@ideanick/backend/src/router/signUp/input'
import { z } from 'zod'
import { Alert } from '../../componets/Alert'
import { Button } from '../../componets/Button'
import { FormItems } from '../../componets/FormItems'
import { Input } from '../../componets/Input'
import { Segment } from '../../componets/Segment'
import { getAllIdeasRoute } from '../../lib/routes'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export const SignUpPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useContext()
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const signUp = trpc.signUp.useMutation()
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validate: withZodSchema(
      zSignUpTrpcInput
        .extend({
          passwordAgain: z.string().min(1),
        })
        .superRefine((val, ctx) => {
          if (val.password !== val.passwordAgain) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Passwords must be the same',
              path: ['passwordAgain'],
            })
          }
        })
    ),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)
        const { token } = await signUp.mutateAsync(values)
        Cookies.set('token', token, { expires: 99999 })
        void trpcUtils.invalidate()
        navigate(getAllIdeasRoute())
      } catch (err: any) {
        setSubmittingError(err.message)
      }
    },
  })

  return (
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Password" name="password" type="password" formik={formik} />
          <Input label="Password again" name="passwordAgain" type="password" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
