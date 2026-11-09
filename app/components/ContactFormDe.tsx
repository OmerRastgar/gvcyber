export default function ContactFormDe() {
  return (
    <form className="contact-form" action="https://formspree.io/f/xzzdgkly" method="POST">
      <div className="form-row">
        <label htmlFor="name">Ihr Name<input id="name" name="name" type="text" autoComplete="name" required /></label>
        <label htmlFor="email">E-Mail<input id="email" name="email" type="email" autoComplete="email" required /></label>
      </div>
      <label htmlFor="subject">Betreff<input id="subject" name="subject" type="text" required /></label>
      <label htmlFor="message">Nachricht<textarea id="message" name="message" rows={6} required /></label>
      <input type="hidden" name="language" value="de" />
      <p className="form-privacy-note">Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben zur Bearbeitung Ihrer Anfrage zu. Details finden Sie in der <a href="/de/datenschutz">Datenschutzerklärung</a>.</p>
      <button type="submit">Absenden <span aria-hidden="true">⟶</span></button>
    </form>
  );
}
