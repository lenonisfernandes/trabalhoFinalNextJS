import AuthForm from "../components/AuthForm";

export default function RegisterPage() {
  return (
    <AuthForm
      title="Cadastrar"
      apiRoute="/api/register"
      submitText="Cadastrar"
      loadingText="Criando conta..."
      onSuccessRedirect="/dashboard"
    />
  );
}
