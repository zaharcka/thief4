module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '53fe49bc0eec98acd08a15ca0091e372'),
  },
});
