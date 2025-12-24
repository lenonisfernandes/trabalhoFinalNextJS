import AuthForm from "../components/AuthForm";

export default function LoginPage() {
  return (
    <AuthForm
      title="Login"
      apiRoute="/api/login"
      submitText="Entrar"
      loadingText="Entrando..."
      onSuccessRedirect="/dashboard"
    />
  );
}

