import type { IStudentItem } from 'src/types/student';

import { useMemo } from 'react';
import {
  Page,
  Text,
  View,
  Font,
  Image,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer';

import LoadingButton from '@mui/lab/LoadingButton';

import { fDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type ApplyPDFProps = {
  student?: IStudentItem;
};

export function ApplyPDFDownload({ student }: ApplyPDFProps) {
  const renderButton = (loading: boolean) => (
    <LoadingButton
      loading={loading}
      size="small"
      color="primary"
      variant="outlined"
      startIcon={<Iconify icon="eva:cloud-download-fill" />}
    >
      Download
    </LoadingButton>
  );

  return (
    <PDFDownloadLink
      document={<ApplyPdfDocument student={student} />}
      fileName={`protiva-${student?.fullName}-${student?.rollNumber}`}
      style={{ textDecoration: 'none' }}
    >
      {/* @ts-expect-error: https://github.com/diegomura/react-pdf/issues/2886 */}
      {({ loading }) => renderButton(loading)}
    </PDFDownloadLink>
  );
}

// ----------------------------------------------------------------------

Font.register({
  family: 'Roboto',
  // fonts from public folder
  fonts: [{ src: '/fonts/Roboto-Regular.ttf' }, { src: '/fonts/Roboto-Bold.ttf' }],
});

const useStyles = () =>
  useMemo(
    () =>
      StyleSheet.create({
        // layout
        page: {
          fontSize: 9,
          lineHeight: 1.6,
          fontFamily: 'Roboto',
          backgroundColor: '#FFFFFF',
          padding: '40px 24px 120px 24px',
        },
        footer: {
          left: 0,
          right: 0,
          bottom: 0,
          padding: 24,
          margin: 'auto',
          borderTopWidth: 1,
          borderStyle: 'solid',
          position: 'absolute',
          borderColor: '#e9ecef',
        },
        container: { flexDirection: 'row', justifyContent: 'space-between' },
        // margin
        mb4: { marginBottom: 4 },
        mb8: { marginBottom: 8 },
        mb40: { marginBottom: 40 },
        // text
        h3: { fontSize: 16, fontWeight: 700, lineHeight: 1.2 },
        h4: { fontSize: 12, fontWeight: 700 },
        text1: { fontSize: 10 },
        text2: { fontSize: 9 },
        text1Bold: { fontSize: 10, fontWeight: 700 },
        text2Bold: { fontSize: 9, fontWeight: 700 },
      }),
    []
  );

type ApplyPdfDocumentProps = {
  student?: IStudentItem;
};

function ApplyPdfDocument({ student }: ApplyPdfDocumentProps) {
  const {
    rollNumber,
    fullName,
    address,
    phoneNumber,
    fatherName,
    motherName,
    centre,
    course,
    createdAt,
    status,
  } = student ?? {};

  const styles = useStyles();

  const renderHeader = () => (
    <View style={[styles.container, styles.mb40]}>
      <Image source="/logo/logo-single.png" style={{ width: 80, height: 70 }} />

      <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
        <Text style={[styles.h3, styles.mb8, { textTransform: 'capitalize' }]}>{status}</Text>
        <Text style={[styles.text2]}>Student ID: {rollNumber}</Text>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={[styles.container, styles.footer]} fixed>
      <View style={{ width: '75%' }}>
        <Text style={[styles.text2Bold, styles.mb4]}>NOTES</Text>
        <Text style={[styles.text2]}>
          Before closing this tab, please ensure you download the application details.
        </Text>
      </View>
      <View style={{ width: '25%', textAlign: 'right' }}>
        <Text style={[styles.text2Bold, styles.mb4]}>Have a question?</Text>
        <Text style={[styles.text2]}>support@protivamef.com</Text>
      </View>
    </View>
  );

  const renderInfo = () => (
    <View style={[styles.container, styles.mb40]}>
      <View style={{ width: '50%' }}>
        <Text style={[styles.text1Bold, styles.mb4]}>Student</Text>
        <Text style={[styles.text2]}>{fullName}</Text>
        <Text style={[styles.text2]}>{address}</Text>
        <Text style={[styles.text2]}>Phone: {phoneNumber}</Text>
        <Text style={[styles.text2]}>Father&apos;s name: {fatherName}</Text>
        <Text style={[styles.text2]}>Mother&apos;s name: {motherName}</Text>
      </View>

      <View style={{ width: '50%' }}>
        <Text style={[styles.text1Bold, styles.mb4]}>Centre</Text>
        <Text style={[styles.text2]}>{centre?.name}</Text>
        <Text style={[styles.text2]}>{centre?.address}</Text>
        <Text style={[styles.text2]}>Phone: {centre?.phoneNumber}</Text>
        <Text style={[styles.text2]}>Course code: {course?.code}</Text>
        <Text style={[styles.text2]}>Course: {course?.title}</Text>
      </View>
    </View>
  );

  const renderDates = () => (
    <View style={[styles.container, styles.mb40]}>
      <View style={{ width: '50%' }}>
        <Text style={[styles.text1Bold, styles.mb4]}>Date application</Text>
        <Text style={[styles.text2]}>{fDate(createdAt)}</Text>
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {renderHeader()}
        {renderInfo()}
        {renderDates()}
        {renderFooter()}
      </Page>
    </Document>
  );
}
