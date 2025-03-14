import React from "react";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import bwipjs from "bwip-js";
//WRIITE A FUNCTION TO CONSOLE.LOG RANDOM NUMBER
const styles = StyleSheet.create({
    row: { display: "flex", flexDirection: "row", justifyContent: "space-between" },
    row2: { display: "flex", flexDirection: "row", marginTop: 34 }, // Reduced by 15%
    column: { display: "flex", flexDirection: "column" },
    boldText: { fontWeight: 700, fontSize: 6.8 }, // Reduced by 15%
    addressText: { fontSize: 6.8, marginBottom: 1.7 }, // Reduced by 15%
    trackingText: { fontWeight: 700, fontSize: 6.8, marginBottom: 1.7 }, // Reduced by 15%
    normal: { fontSize: 6.8 }, // Reduced by 15%
    header: { fontSize: 20.4, fontWeight: 250, textAlign: 'center', marginTop: 4.25 }, // Reduced by 15%
    subHeader: { fontSize: 6.8, marginBottom: 1.7 }, // Reduced by 15%
    barcode: { marginVertical: 6.25, height: 53, width: 250, alignItems: 'center', justifyContent: 'center' }, // Reduced by 15%
    smallText: { fontSize: 6.8, fontWeight: 'bold', fontStyle: 'bold', marginVertical: 4.25 }, // Reduced by 15%
    smallTextB: { fontSize: 5.95 }, // Reduced by 15%
    smallBoldText: { fontSize: 6.8, fontWeight: 700 }, // Reduced by 15%
    section: { borderWidth: 2, borderColor: '#000', borderStyle: 'solid', height: 34, borderLeft: 0, borderRight: 0 }, // Reduced by 15%
    section2: { borderWidth: 5, borderColor: '#000', borderStyle: 'solid', marginTop: 29.75, borderLeft: 0, borderRight: 0, height: 120 }, // Reduced by 15%
    sectionSmall: { padding: 4.25, borderWidth: 1, borderColor: '#000', borderStyle: 'solid', marginBottom: 8.5 }, // Reduced by 15%
    shipTo: { fontWeight: 700, fontSize: 6.8, marginTop: 8.5, marginBottom: 1.7 }, // Reduced by 15%
    centerText: { textAlign: 'center' },
    square: { width: 77.5, height: 77.5, borderLeft: 1, borderRight: 1, borderTop: 1, borderColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 0, marginTop: 4.75, borderBottom: 0 }, // Reduced by 15%
    InternalBox: {
        paddingTop: 0,
        marginTop: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    square2: {
        width: 76.5,
        height: 59.5,
        borderWidth: 1,
        borderColor: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8.5,
        paddingBottom: 11.9,
        fontWeight: 250, // This makes the text bold
        fontStyle: 'bold',
    },
    squareText: { fontSize: 59.5, fontWeight: 800 } // Reduced by 15%
});

const generateBarcode = async (text) => {
    try {
        const canvas = document.createElement('canvas');
        bwipjs.toCanvas(canvas, {
            bcid: 'code128',  // Type of barcode
            text: text,       // Text to encode
            scale: 7,         // Barcode scale
            height: 12,       // Barcode height
        });

        return canvas.toDataURL('image/png');
    } catch (error) {
        console.error("Barcode generation error:", error);
        return nulL;  // Return null in case of error
    }
};

const Usps_Priority = ({ csvData }) => {
    const [barcodes, setBarcodes] = React.useState(Array(csvData.length).fill(""));

    React.useEffect(() => {
        const generateAllBarcodes = async () => {
            const generatedBarcodes = await Promise.all(
                csvData.map(row =>
                    generateBarcode(`420${row[14]}${row[23]}`) // Barcode logic
                )
            );
            setBarcodes(generatedBarcodes);
        };

        generateAllBarcodes();
    }, [csvData]);


    return (
        <Document>
            {csvData.map((row, index) => {
                const data = {
                    fromName: row[0],
                    fromCompany: row[1],
                    fromStreet: row[2],
                    fromStreet2: row[3],
                    fromCity: row[4],
                    fromState: row[5],
                    fromZip: row[6],
                    toName: row[8],
                    toCompany: row[9],
                    toStreet: row[10],
                    toStreet2: row[11],
                    toCity: row[12],
                    toState: row[13],
                    toZip: row[14],
                    trackingNumber: row[23],
                    description: row[20],
                    reference1: csvData[0][21], // Reference 1
                    reference2: csvData[0][22], // Reference 2
                };

                return (
                    <Page size="A6" key={`label-${index}`}>
                        <View>
                            <View style={styles.row}>
                                <View style={styles.square}>
                                    <Text style={styles.squareText}>P</Text>
                                </View>
                                <View style={[styles.square2]}>
                                    <View style={[styles.InternalBox, { paddingTop: 3.4 }]}>
                                        <Text style={styles.smallText}>PRIORITY MAIL</Text>
                                        <Text style={styles.smallText}>U.S. POSTAGE PAID</Text>
                                        <Text style={styles.smallText}>ATFM</Text>
                                        <Text style={[styles.smallText, { marginBottom: 12.75 }]}>e-Postage</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.section}>
                                <Text style={styles.header}>USPS PRIORITY MAIL ®</Text>
                            </View>
                            <View style={styles.row}>
                                <View style={{ fontSize: 7.1, marginLeft: 6.55, marginTop: 5.15 }}>
                                    <Text style={{ textTransform: 'uppercase' }}>{data.fromName}</Text>
                                    <Text style={{ textTransform: 'uppercase' }}>{data.fromCompany}</Text>
                                    <Text style={{ textTransform: 'uppercase' }}>{data.fromStreet}</Text>
                                    <Text style={{ textTransform: 'uppercase' }}>{data.fromCity} {data.fromState} {data.fromZip}</Text>
                                </View>
                                <View style={{ fontSize: 7.1, marginRight: 6.55, marginTop: 5.15, textAlign: 'right', alignItems: 'flex-end', display: 'flex' }}>
                                    <Text style={{ textTransform: 'uppercase' }}>Mailed From {data.fromZip}</Text>
                                    <Text>WT: {row[16]}.0000 lb</Text>
                                </View>
                            </View>
                            <View style={styles.row2}>
                                <View style={{ fontSize: 9.5, marginLeft: 5.95 }}>
                                    <Text>SHIP</Text>
                                    <Text>TO:</Text>
                                </View>
                                <View style={{ fontSize: 11.05, fontWeight: 700, marginLeft: 8.5, maxWidth: 300 }}>
                                    <Text style={{ textTransform: 'uppercase' }}>{data.toName}</Text>
                                    <Text style={{ maxWidth: "90%", flexWrap: "wrap", textTransform: 'uppercase' }}>
                                        {data.toStreet} {data.toCompany}
                                    </Text>
                                    <Text style={{ maxWidth: "90%", flexWrap: "wrap", textTransform: 'uppercase' }}>
                                        {data.toStreet2}
                                    </Text>
                                    <Text style={{ textTransform: 'uppercase' }}>{data.toCity} {data.toState} {data.toZip}</Text>
                                </View>
                            </View>
                            <View style={styles.section2}>
                                <Text style={{ textAlign: 'center', marginTop: 6.55, fontSize: 12.9, fontWeight: 700 }}>
                                    USPS TRACKING # EP
                                </Text>
                                <View style={{ textAlign: 'center', marginTop: 5.95, alignItems: 'center', alignContent: 'center' }}>
                                    <Image style={styles.barcode} src={barcodes[index] || ''} />
                                </View>
                                <Text style={{ textAlign: 'center', marginTop: 1.85, fontSize: 10.2, fontWeight: 500 }}>
                                    {data.trackingNumber}
                                </Text>
                            </View>
                            <View style={{ borderWidth: 2, borderColor: '#000', borderStyle: 'solid', height: 10, borderLeft: 0, borderRight: 0, borderBottom: 0, borderTop: 0 }}>
                                <Text style={{ fontSize: "6px", marginTop: 6, marginBottom: 4, paddingLeft: 1, }}>
                                    DESC: {data.description}
                                </Text>
                            </View>
                        </View>
                    </Page>
                );
            })}
        </Document>
    );
};

export default Usps_Priority;
