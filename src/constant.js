export const DB_NAME = "DigiNutri";

const UserActivity = {
  Sedentary: 1.4,
  Heavy: 2.3,
  Moderate: 1.8,
  Very: 1.725,
  Extra: 1.9,
};

const ReferralCodes = [
  { code: "MEROAAHAR30", discount: 30 },
  { code: "MEROAAHAR40", discount: 40 },
  { code: "MEROAAHAR50", discount: 50 },
  { code: "MEROAAHAR60", discount: 60 },
  { code: "MEROAAHAR70", discount: 70 },
  { code: "MEROAAHAR100", discount: 100 },
];

export { UserActivity, ReferralCodes };
