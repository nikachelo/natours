/* eslint-disable */
const stripe = Stripe(
  'pk_test_51OuRDPD4HqN3vc2Sak6fLQwhM8qPtups9cKFPfPrnw03B1F38IeJ7pPaDWnAV37X9UfziVeShDDiLzzj23GsJtAU00dykqIDgD',
);

const bookBtn = document.getElementById('book-tour');

const bookTour = async (tourId) => {
  // 1. Get the session from the server/API
  try {
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );

    // 2. Create checkout form + charge credit card

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    //
  }
};

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
