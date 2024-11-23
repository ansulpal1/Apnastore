

const verifyEmailTemplate = ({name,url}) => {
  return `
  <p>Dear ${name}❤️</p>
  <p>Thank you for registering with ApnaStore. Please click on the link below to activate your User account 👇👇</p>
  <a href="${url}">👉Click here👈</a><p> to activate your account</p>
  `
    
}

export default verifyEmailTemplate