/* eslint-disable new-cap, import/no-mutable-exports */
/* global Stripe */

export default (callback) => {
  const existingScript = document.getElementById('stripejs');

  if (existingScript && callback) {
    callback(window.stripe);
  } else {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.id = 'stripejs';
    document.body.appendChild(script);

    script.onload = () => {
      window.stripe = Stripe('pk_test_LJRLzfGpAKW6cXptSs8BppT8');
      if (callback) callback(window.stripe);
    };
  }
};
