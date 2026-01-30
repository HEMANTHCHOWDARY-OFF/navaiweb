import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 12,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
    textAlign: 'left',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  contact: {
    fontSize: 11,
    color: '#000',
    marginBottom: 2,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
    textAlign: 'left',
  },
  text: {
    fontSize: 13,
    color: '#000',
    marginBottom: 4,
  },
  bulletList: {
    marginLeft: 15,
  },
  bullet: {
    fontSize: 13,
    color: '#000',
    marginBottom: 3,
  },
  item: {
    marginBottom: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#000',
  },
  subtitle: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#000',
    marginBottom: 2,
  },
  details: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#000',
    marginBottom: 4,
  },
  achievementItem: {
    fontSize: 13,
    color: '#000',
    marginBottom: 2,
  },
  skillCategory: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 8,
    color: '#000',
  },
});

const ResumePDF = ({ data }) => {
  const { personalInfo, professionalSummary, skills, workExperience, projects, education, certifications, achievements, volunteer, languages, references } = data;

  const renderBullets = (bullets) => {
    return bullets.filter(b => b.trim()).map((bullet, i) => (
      <Text key={i} style={styles.bullet}>{`• ${bullet}`}</Text>
    ));
  };

  const renderSkills = () => {
    return skills.map((skill, catIndex) => (
      skill.category.trim() && skill.items.some(item => item.trim()) ? (
        <View key={catIndex}>
          <Text style={styles.skillCategory}>{skill.category}</Text>
          <View style={styles.bulletList}>
            {skill.items.filter(item => item.trim()).map((item, i) => (
              <Text key={i} style={styles.bullet}>{`• ${item}`}</Text>
            ))}
          </View>
        </View>
      ) : null
    )).filter(Boolean);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={[styles.header, { alignItems: 'center' }]}>
          <Text style={[styles.name, { textAlign: 'center' }]}>{personalInfo.name}</Text>
          {(() => {
            const locationStr = personalInfo.location ? `${personalInfo.location.city || ''}${personalInfo.location.city && personalInfo.location.country ? ', ' : ''}${personalInfo.location.country || ''}`.trim() : '';
            const contactParts = [
              personalInfo.address,
              locationStr,
              personalInfo.email,
              personalInfo.phone,
              personalInfo.linkedin,
              personalInfo.github || personalInfo.portfolio
            ].filter(part => part && part.trim());
            return contactParts.length > 0 ? (
              <Text style={[styles.contact, { textAlign: 'center' }]}>{contactParts.join(' | ')}</Text>
            ) : null;
          })()}
        </View>

        {/* Horizontal Divider */}
        <View style={{ borderTop: '1px solid black', marginVertical: 10 }} />

        {/* Professional Summary */}
        {professionalSummary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.text}>{professionalSummary}</Text>
            <View style={{ borderBottom: '1px solid black', marginVertical: 5 }} />
          </View>
        )}

        {/* Education */}
        {education.some(edu => edu.degree) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, i) =>
              edu.degree && (
                <Text key={i} style={styles.text}>
                  {[
                    edu.degree,
                    edu.institution,
                    edu.duration || edu.graduationYear,
                    edu.cgpaPercentage ? `Scored ${edu.cgpaPercentage}` : ''
                  ].filter(part => part.trim()).join(' | ')}
                </Text>
              )
            )}
            <View style={{ borderBottom: '1px solid black', marginVertical: 5 }} />
          </View>
        )}

        {/* Skills */}
        {skills.some(s => s.items.some(i => i.trim())) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {renderSkills()}
            <View style={{ borderBottom: '1px solid black', marginVertical: 5 }} />
          </View>
        )}

        {/* Experience */}
        {workExperience.some(exp => exp.jobTitle) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {workExperience.map((exp, i) =>
              exp.jobTitle && (
                <View key={i} style={styles.item}>
                  <Text style={[styles.title, { fontWeight: 'bold' }]}>{exp.jobTitle}</Text>
                  {exp.company && <Text style={[styles.subtitle, { fontStyle: 'italic' }]}>{exp.company}</Text>}
                  {((exp.location?.city || exp.location?.country) || exp.duration) && (
                    <Text style={styles.details}>
                      {[
                        `${exp.location?.city || ''}${exp.location?.city && exp.location?.country ? ', ' : ''}${exp.location?.country || ''}`.trim(),
                        exp.duration
                      ].filter(part => part.trim()).join(' | ')}
                    </Text>
                  )}
                  <View style={styles.bulletList}>
                    {renderBullets(exp.bullets)}
                  </View>
                </View>
              )
            )}
            <View style={{ borderBottom: '1px solid black', marginVertical: 5 }} />
          </View>
        )}

        {/* Projects */}
        {projects.some(proj => proj.title) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj, i) =>
              proj.title && (
                <View key={i} style={styles.item}>
                  <Text style={[styles.title, { fontWeight: 'bold' }]}>
                    {proj.title}{proj.duration ? ` (${proj.duration})` : ''}
                  </Text>
                  {(() => {
                    const technologiesArray = typeof proj.technologies === 'string' 
                      ? proj.technologies.split(',').map(t => t.trim()).filter(t => t) 
                      : proj.technologies || [];
                    return technologiesArray.length > 0 && (
                      <Text style={[styles.subtitle, { fontStyle: 'italic' }]}>
                        {technologiesArray.join(', ')}
                      </Text>
                    );
                  })()}
                  <View style={styles.bulletList}>
                    {renderBullets(proj.bullets)}
                  </View>
                </View>
              )
            )}
            <View style={{ borderBottom: '1px solid black', marginVertical: 5 }} />
          </View>
        )}

        {/* Certifications */}
        {certifications.some(cert => cert.name) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications.map((cert, i) =>
              cert.name && (
                <Text key={i} style={styles.text}>
                  {[cert.name, cert.authority, cert.completionYear || cert.validity].filter(part => part.trim()).join(' | ')}
                </Text>
              )
            )}
            <View style={{ borderBottom: '1px solid black', marginVertical: 5 }} />
          </View>
        )}

        {/* Achievements */}
        {achievements.some(ach => ach.title) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            {achievements.map((ach, i) =>
              ach.title && (
                <Text key={i} style={styles.text}>
                  {[ach.title, ach.issuer, ach.date].filter(part => part.trim()).join(' | ')}
                </Text>
              )
            )}
            <View style={{ borderBottom: '1px solid black', marginVertical: 5 }} />
          </View>
        )}

        {/* Volunteer Experience */}
        {volunteer.some(vol => vol.role) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Volunteer Experience</Text>
            {volunteer.map((vol, i) =>
              vol.role && (
                <View key={i} style={styles.item}>
                  <Text style={[styles.title, { fontWeight: 'bold' }]}>{vol.role}</Text>
                  {vol.organization && <Text style={[styles.subtitle, { fontStyle: 'italic' }]}>{vol.organization}</Text>}
                  {vol.duration && <Text style={styles.details}>{vol.duration}</Text>}
                  <View style={styles.bulletList}>
                    {renderBullets(vol.contributions)}
                  </View>
                </View>
              )
            )}
            <View style={{ borderBottom: '1px solid black', marginVertical: 5 }} />
          </View>
        )}

        {/* Languages */}
        {languages.some(lang => lang.name) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={styles.bulletList}>
              {languages.filter(lang => lang.name).map((lang, i) => (
                <Text key={i} style={styles.bullet}>{`• ${lang.name} (${lang.proficiency})`}</Text>
              ))}
            </View>
            <View style={{ borderBottom: '1px solid black', marginVertical: 5 }} />
          </View>
        )}

        {/* References */}
        {references.some(ref => ref.name) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>References</Text>
            {references.map((ref, i) =>
              ref.name && (
                <Text key={i} style={styles.text}>
                  {[ref.name, ref.designation, ref.email, ref.phone].filter(part => part.trim()).join(' | ')}
                </Text>
              )
            )}
            <View style={{ borderBottom: '1px solid black', marginVertical: 5 }} />
          </View>
        )}
      </Page>
    </Document>
  );
};
export default ResumePDF;