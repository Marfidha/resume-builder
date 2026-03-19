import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica'
  },

  header: {
    marginBottom: 15
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },

  contact: {
    fontSize: 10,
    marginBottom: 10
  },

  section: {
    marginBottom: 12
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    borderBottom: '1px solid black',
    paddingBottom: 2
  },

  text: {
    fontSize: 10,
    lineHeight: 1.5
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  bold: {
    fontWeight: 'bold',
    fontSize: 11
  }
});

const ResumePDF = ({ resume }) => (
  <Document>
    <Page style={styles.page}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.name}>
          {resume.personalInfo?.fullName}
        </Text>

        <Text style={styles.contact}>
          {resume.personalInfo?.email} • {resume.personalInfo?.phone} • {resume.personalInfo?.location}
        </Text>
      </View>

      {/* SUMMARY */}
      {resume.summary?.text && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
          <Text style={styles.text}>{resume.summary.text}</Text>
        </View>
      )}

      {/* EXPERIENCE */}
      {resume.experience?.entries?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>

          {resume.experience.entries.map((exp, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <View style={styles.row}>
                <Text style={styles.bold}>{exp.jobTitle}</Text>
                <Text style={styles.text}>
                  {exp.startDate} - {exp.endDate || "Present"}
                </Text>
              </View>

              <Text style={styles.text}>
                {exp.company} • {exp.location}
              </Text>

              <Text style={styles.text}>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* EDUCATION */}
      {resume.education?.degree && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>

          <View style={styles.row}>
            <Text style={styles.bold}>{resume.education.degree}</Text>
            <Text style={styles.text}>{resume.education.graduationDate}</Text>
          </View>

          <Text style={styles.text}>
            {resume.education.institution} • {resume.education.location}
          </Text>
        </View>
      )}

      {/* SKILLS */}
      {resume.skills?.skillsList?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SKILLS</Text>
          <Text style={styles.text}>
            {resume.skills.skillsList.join(" • ")}
          </Text>
        </View>
      )}

    </Page>
  </Document>
);

export default ResumePDF;