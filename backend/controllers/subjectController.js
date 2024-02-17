import Subject from "../models/Subject.js";

export const getAllSubjects = async (req, res) => {
  console.log("In backend of all subjects");
  const id = req.params.teacherId;
  try {
    const allSubjects = await Subject.find({ createdBy: id });
    // console.log("this is all subjects created by that user", allSubjects);
    res.status(200).json({ subjects: allSubjects });
  } catch (error) {
    console.error("Error while fetching subjects: ", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const createSubject = async (req, res) => {
  const { name, createdBy } = req.body;
  try {
    const sub = await Subject.findOne({ name });
    if (!sub) {
      const newSubject = new Subject({
        name: name,
        createdBy: createdBy,
      });
      const saveSubject = await newSubject.save();
      res.status(201).json(saveSubject);
    } else {
      res.status(400).json({ error: "Subject already exists" });
    }
  } catch (error) {
    console.error("Error while creating subject: ", error);
    res.status(500).json({ error: "Server error" });
  }
};
