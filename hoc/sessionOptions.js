// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
export const sessionOptions = {
  password: 'ngcihiB7uEJHZWbfpfuyJdQY10R2MF2KrE5XE9d0qtHuUKTTZf',
  cookieName: "_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

