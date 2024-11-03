import Patient from "../models/patient.js";

export async function createPatient(req, res) {
  try {
    const { name, age, gender } = req.body;
    // Assuming you have the user's ID from authentication middleware
    const userId = req.user._id;

    const newPatient = new Patient({
      name,
      age,
      gender,
      createdBy: userId, // Associate the patient with the user who created it
    });

    await newPatient.save();
    res.status(201).json({ msg: "Patient added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function showAllPatients(req, res) {
  try {
    // Only fetch patients created by the current user
    const userId = req.user._id;
    const allPatients = await Patient.find({ createdBy: userId });

    const html = `
      <ul>
        ${allPatients.map(
          (patient) => `<li>${patient.name} - ${patient.gender}</li>`
        )}
      </ul>
    `;
    return res.send(html);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
