import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles using the library's stylesheet
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.4,
    color: '#333',
  },
  header: {
    marginBottom: 20,
    borderBottom: '1pt solid #ccc',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  headline: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  contactInfo: {
    fontSize: 10,
    color: '#666',
    flexDirection: 'row',
    gap: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    borderBottom: '1pt solid #eee',
    marginBottom: 8,
    paddingBottom: 2,
    textTransform: 'uppercase',
    color: '#000',
  },
  entry: {
    marginBottom: 10,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  jobTitle: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  company: {
    fontStyle: 'italic',
  },
  date: {
    fontSize: 10,
    color: '#666',
  },
  description: {
    marginTop: 4,
    textAlign: 'justify',
  },
  // NEW: Styles for the Skills Section
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skillItem: {
    fontSize: 10,
    backgroundColor: '#f3f4f6', // Light gray background
    padding: '2 6',
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
});

// This component renders the actual PDF document
const ResumePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personal.name || 'Your Name'}</Text>
        <Text style={styles.headline}>{data.personal.headline}</Text>
        <View style={styles.contactInfo}>
          {data.personal.email && <Text>{data.personal.email}</Text>}
          {data.personal.phone && <Text>• {data.personal.phone}</Text>}
          {data.personal.location && <Text>• {data.personal.location}</Text>}
        </View>
      </View>
      
      {/* NEW: Skills Section */}
      {data.skills && data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {data.skills.map((skill) => (
              <Text key={skill.id} style={styles.skillItem}>
                {skill.name}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Experience Section */}
      {data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((exp) => (
            <View key={exp.id} style={styles.entry}>
              <View style={styles.entryHeader}>
                <View>
                  <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                  <Text style={styles.company}>{exp.company}</Text>
                </View>
                <Text style={styles.date}>{exp.dates}</Text>
              </View>
              <Text style={styles.description}>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Education Section */}
      {data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu) => (
            <View key={edu.id} style={styles.entry}>
              <View style={styles.entryHeader}>
                <View>
                  <Text style={styles.jobTitle}>{edu.school}</Text>
                  <Text style={styles.company}>{edu.degree}</Text>
                </View>
                <Text style={styles.date}>{edu.dates}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default ResumePDF;