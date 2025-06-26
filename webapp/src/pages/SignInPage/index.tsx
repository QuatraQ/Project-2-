import { useState } from 'react'
import { trpc } from '../../lib/trpc'
import { withZodSchema } from 'formik-validator-zod'
import { zSignInTrpcInput } from '@ideanick/backend/src/router/signIn/input'
import { Segment } from '../../componets/Segment'
import { FormItems } from '../../componets/FormItems'
import { Input } from '../../componets/Input'
import { Alert } from '../../componets/Alert'
import { useFormik } from 'formik'
import { Button } from '../../componets/Button'
import { getAllIdeasRoute } from '../../lib/routes'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export const SignInPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useContext()
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const signIn = trpc.signIn.useMutation()
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
    },
    validate: withZodSchema(zSignInTrpcInput),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)
        const { token } = await signIn.mutateAsync(values)
        Cookies.set('token', token, { expires: 99999 })
        void trpcUtils.invalidate()
        navigate(getAllIdeasRoute())
      } catch (err: any) {
        setSubmittingError(err.message)
      }
    },
  })
  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Password" name="password" type="password" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
