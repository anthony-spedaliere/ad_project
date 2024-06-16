import GlobalStyles from "../styles/GlobalStyles";

function ErrorFallback() {
  return (
    <div>
      <GlobalStyles />
      <h1>Oops!</h1>
      <p>Sorry, an error has occurred!</p>
      <p>Not found.</p>
    </div>
  );
}

export default ErrorFallback;
