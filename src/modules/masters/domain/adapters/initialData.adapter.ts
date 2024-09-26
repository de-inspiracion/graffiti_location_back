export const postResponseAdapter = (data: any) => {
  return {
    id: data['_id'],
    name: data.name,
    lastName: data.lastName,
    photoSelfie: data.photoSelfie,
    photoDocumentFront: data.photoDocumentFront,
    photoDocumentBack: data.photoDocumentBack,
    yearsExperience: data.yearsExperience,
    sportsImplementation: data.sportsImplementation,
    email: data.email,
    city: data.city,
    stateAddress: data.stateAddress,
    phone: data.phone,
    address: data.address,
    stateRegistry: data.stateRegistry,
    birthdate: data.birthdate,
    postalCode: data.postalCode,
  };
};
