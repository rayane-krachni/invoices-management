// components/InvoicePDF.tsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Convert numbers to French words (supports up to 999,999)
const UNITS = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
const TEENS = ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
const TENS = ["", "", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingt", "quatre-vingt-dix"];

const numberToFrench = (n: number): string => {
    if (n < 10) return UNITS[n];
    if (n < 20) return TEENS[n - 10];
    if (n < 100) {
        const ten = Math.floor(n / 10);
        let unit = n % 10;
        if (ten === 7 || ten === 9) unit += 10;
        let tenWord = TENS[ten];
        if (ten === 7) tenWord = "soixante";
        if (ten === 9) tenWord = "quatre-vingt";
        if (unit === 1 && ten !== 8) return tenWord + "-et-un";
        return unit > 0 ? tenWord + "-" + numberToFrench(unit) : tenWord;
    }
    if (n < 1000) {
        const hundreds = Math.floor(n / 100);
        const rest = n % 100;
        const hundredWord = hundreds > 1 ? UNITS[hundreds] + " cent" : "cent";
        return rest > 0 ? hundredWord + " " + numberToFrench(rest) : hundredWord;
    }
    if (n < 1000000) {
        const thousands = Math.floor(n / 1000);
        const rest = n % 1000;
        const thousandWord = thousands > 1 ? numberToFrench(thousands) + " mille" : "mille";
        return rest > 0 ? thousandWord + " " + numberToFrench(rest) : thousandWord;
    }
    return n.toString();
};

const amountToFrenchWords = (amount: number | string) => {
    const num = Number(amount) || 0;
    const integerPart = Math.floor(num);
    const decimalPart = Math.round((num - integerPart) * 100);

    if (decimalPart === 0) {
        return `${numberToFrench(integerPart)} dinars algériens`;
    }
    return `${numberToFrench(integerPart)} dinars et ${numberToFrench(decimalPart)} centimes`;
};

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 10,
        padding: 30,
        backgroundColor: '#ffffff',
    },
    // Header Section
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#4A5568',
    },
    logoSection: {
        flexDirection: 'column',
    },
    companyName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2D3748',
    },
    companyTagline: {
        fontSize: 8,
        color: '#718096',
        marginTop: 2,
    },
    qrPlaceholder: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#CBD5E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrText: {
        fontSize: 6,
        color: '#CBD5E0',
    },
    // Title
    documentTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#2D3748',
    },
    // Info Bar
    infoBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F7FAFC',
        padding: 10,
        marginBottom: 10,
        borderLeftWidth: 3,
        borderLeftColor: '#4A5568',
    },
    infoItem: {
        flexDirection: 'column',
    },
    infoLabel: {
        fontSize: 7,
        color: '#1d1e1eff',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#000000ff',
    },
    statusBadge: {
        backgroundColor: '#D1FAE5',
        color: '#065F46',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
        fontSize: 8,
        fontWeight: 'bold',
    },
    // Parties Section
    partiesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    partyBox: {
        width: '48%',
        backgroundColor: '#F8F9FA',
        padding: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 5,
    },
    partyTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#030303ff',
        marginBottom: 8,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#CBD5E0',
    },
    partyRow: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    partyLabel: {
        fontSize: 8,
        fontWeight: 'bold',
        color: '#4A5568',
        width: '35%',
    },
    partyValue: {
        fontSize: 8,
        color: '#2D3748',
        width: '65%',
    },
    // Delivery Info
    deliveryInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#EDF2F7',
        padding: 10,
        marginBottom: 5,
        borderRadius: 5,
    },
    deliveryItem: {
        flexDirection: 'column',
    },
    deliveryLabel: {
        fontSize: 9,
        color: '#000000ff',

        fontWeight: 'bold',

    },
    deliveryValue: {
        fontSize: 10,
        fontWeight: 'normal',
        color: '#3b3b3bff',
    },
    // Section Title
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#2D3748',
        marginTop: 15,
        marginBottom: 8,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    // Table
    table: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginTop: 5,
        marginBottom: 10,
    },
    tableHeader: {
        flexDirection: 'row',
         backgroundColor: '#EDF2F7',
        color: '#FFFFFF',
    },
    tableHeaderCell: {
        padding: 8,
        fontSize: 8,
        fontWeight: 'bold',
        color: '#0b0b0bff',
        textTransform: 'uppercase',
        borderRightWidth: 1,
        borderRightColor: '#E2E8F0',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    tableCell: {
        padding: 8,
        fontSize: 8,
        borderRightWidth: 1,
        borderRightColor: '#E2E8F0',
    },
    // Column widths
    colCode: { width: '10%' },
    colProduct: { width: '20%' },
    colDescription: { width: '25%' },
    colQty: { width: '10%', textAlign: 'center' },
    colPrice: { width: '12%', textAlign: 'right' },
    colTax: { width: '10%', textAlign: 'center' },
    colTotalHT: { width: '13%', textAlign: 'right', borderRightWidth: 0 },
    // Totals Section
    totalsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    totalsBox: {
        width: '45%',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 5,
        overflow: 'hidden',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    totalLabel: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#4A5568',
    },
    totalValue: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#2D3748',
    },
    totalFinalRow: {
        backgroundColor: '#EDF2F7',
        borderBottomWidth: 0,
    },
    totalFinalLabel: {
        color: '#000000ff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    totalFinalValue: {
        color: '#000000ff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    totalWords: {

        padding: 5,
        textAlign: 'center',
        fontSize: 8,
        fontStyle: 'italic',
        color: '#000000ff',
    },
    // Notes Section
    notesSection: {
        backgroundColor: '#FFFBEB',
        borderWidth: 1,
        borderColor: '#FBBF24',
        borderRadius: 5,
        padding: 12,
        marginTop: 15,
    },
    notesTitle: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#92400E',
        marginBottom: 6,
    },
    notesContent: {
        fontSize: 8,
        color: '#78350F',
        lineHeight: 1.4,
    },
    // Signature Section
    signatureSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    signatureBox: {
        width: '48%',
        borderWidth: 1,
        borderColor: '#CBD5E0',
        borderStyle: 'dashed',
        padding: 12,
        borderRadius: 5,
        minHeight: 70,
        alignItems: 'center',
    },
    signatureTitle: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#4A5568',
        marginBottom: 30,
    },
    letterTitle: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#4A5568'
    },
    signatureLine: {
        width: '80%',
        borderTopWidth: 1,
        borderTopColor: '#2D3748',
        paddingTop: 5,
        textAlign: 'center',
    },
    signatureDate: {
        fontSize: 7,
        color: '#718096',
    },
    // Footer
    footer: {
        marginTop: 20,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 7,
        color: '#718096',
        textAlign: 'center',
        marginBottom: 2,
    },
    footerBold: {
        fontSize: 8,
        fontWeight: 'bold',
        color: '#4A5568',
        marginBottom: 2,
    },
});

interface InvoicePDFProps {
    invoice: any & { items?: any[] };
}

export const InvoicePDF: React.FC<InvoicePDFProps> = ({ invoice }) => {
    const formatDate = (date?: Date | string) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('fr-FR');
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header with Logo and QR */}
                <View style={styles.headerContainer}>
                    <View style={styles.logoSection}>
                        <Text style={styles.companyName}>
                            {invoice.fournisseur?.fullName || 'Nom de l\'entreprise'}
                        </Text>
                        <Text style={styles.companyTagline}>
                            {invoice.fournisseur?.activity || 'Commerce de détail'}
                        </Text>
                    </View>
                    {/* <View style={styles.qrPlaceholder}>
                        <Text style={styles.qrText}>QR CODE</Text>
                    </View> */}
                </View>

                {/* Document Title */}
                <Text style={styles.documentTitle}>
                    {invoice.invoiceType || 'BON DE LIVRAISON'}
                </Text>

                {/* Info Bar */}
                <View style={styles.infoBar}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Numéro de Facture</Text>
                        <Text style={styles.infoValue}>#{invoice.invoiceNumber || '00000'}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Date de Facture</Text>
                        <Text style={styles.infoValue}>{formatDate(invoice.date)}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Date de Livraison</Text>
                        <Text style={styles.infoValue}>{formatDate(invoice.deliveryDate || invoice.date)}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Mode de Paiement</Text>
                        <Text style={styles.infoValue}>{invoice.paymentMode || 'DZD'}</Text>
                    </View>
                  
                </View>

                {/* Fournisseur & Client */}
                <View style={styles.partiesContainer}>
                    {/* Fournisseur */}
                    <View style={styles.partyBox}>
                        <Text style={styles.partyTitle}>FOURNISSEUR</Text>
                        {[
                            ['Nom', invoice.fournisseur?.fullName],
                            ['Activité', invoice.fournisseur?.activity],
                            ['Adresse', invoice.fournisseur?.address],
                            ['Téléphone', invoice.fournisseur?.phone],
                            ['Art', invoice.fournisseur?.art],
                            ['NIS', invoice.fournisseur?.nis],
                            ['NIF', invoice.fournisseur?.nif],
                            ['RC', invoice.fournisseur?.rc],
                        ].map(([label, value]) => (
                            <View key={label} style={styles.partyRow}>
                                <Text style={styles.partyLabel}>{label}:</Text>
                                <Text style={styles.partyValue}>{value || 'N/A'}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Client */}
                    <View style={styles.partyBox}>
                        <Text style={styles.partyTitle}>CLIENT</Text>
                        {[
                            ['Nom', invoice.client?.fullName],
                            ['Activité', invoice.client?.activity],
                            ['Adresse', invoice.client?.address],
                            ['Téléphone', invoice.client?.phone],
                            ['Art', invoice.client?.art],
                            ['NIS', invoice.client?.nis],
                            ['NIF', invoice.client?.nif],
                            ['RC', invoice.client?.rc],
                        ].map(([label, value]) => (
                            <View key={label} style={styles.partyRow}>
                                <Text style={styles.partyLabel}>{label}:</Text>
                                <Text style={styles.partyValue}>{value || 'N/A'}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Delivery Info */}
                {(invoice.invoiceType === 'BON DE LIVRAISON' || invoice.invoiceType === 'Bon de Transfert' ) && <Text style={styles.sectionTitle}>DÉTAILS DE LA LIVRAISON</Text>}
               {(invoice.invoiceType === 'BON DE LIVRAISON' || invoice.invoiceType === 'Bon de Transfert' ) && <View style={styles.deliveryInfo}>
                    <View style={[styles.deliveryItem, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <Text style={styles.deliveryLabel}>Chauffeur:</Text>
                        <Text style={styles.deliveryValue}>{invoice.chauffeurName || '-'}</Text>
                    </View>

                    <View style={[styles.deliveryItem, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <Text style={styles.deliveryLabel}>Téléphone:</Text>
                        <Text style={styles.deliveryValue}>{invoice.chauffeurPhone || '-'}</Text>
                    </View>
                    <View style={[styles.deliveryItem, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <Text style={styles.deliveryLabel}>Matricule:</Text>
                        <Text style={styles.deliveryValue}>{invoice.transportLicense || '-'}</Text>
                    </View>
                </View>}

                {/* Section Title */}
                <Text style={styles.sectionTitle}>DÉTAILS DE LA FACTURE</Text>

                {/* Products Table */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderCell, styles.colCode]}>Code</Text>
                        <Text style={[styles.tableHeaderCell, styles.colProduct]}>Produit</Text>
                        <Text style={[styles.tableHeaderCell, styles.colQty]}>Qté</Text>
                        <Text style={[styles.tableHeaderCell, styles.colPrice]}>Prix Unit.</Text>
                        <Text style={[styles.tableHeaderCell, styles.colTax]}>TVA (%)</Text>
                        <Text style={[styles.tableHeaderCell, styles.colTotalHT]}>Total HT</Text>
                    </View>
                    {invoice.items?.map((item: any, index: number) => {
                        const quantity = Number(item.item?.quantity || 0);
                        const unitPrice = Number(item.unitPrice || item.product?.price || 0);
                        const taxRate = Number(item.taxRate || item.product?.tva || 0);
                        const totalHT = unitPrice * quantity;

                        return (
                            <View key={item.id || index} style={styles.tableRow}>
                                <Text style={[styles.tableCell, styles.colCode]}>
                                    {item.product?.code || `PROD-${index + 1}`}
                                </Text>
                                <Text style={[styles.tableCell, styles.colProduct]}>
                                    {item.product?.name || 'Article'}
                                </Text>
                                <Text style={[styles.tableCell, styles.colQty]}>
                                    {quantity}
                                </Text>
                                <Text style={[styles.tableCell, styles.colPrice]}>
                                    {unitPrice.toFixed(2)} DA
                                </Text>
                                <Text style={[styles.tableCell, styles.colTax]}>
                                    {taxRate.toFixed(2)}
                                </Text>
                                <Text style={[styles.tableCell, styles.colTotalHT]}>
                                    {totalHT.toFixed(2)} DA
                                </Text>
                            </View>
                        );
                    })}
                </View>

                {/* Totals Section */}
                <View style={styles.totalsContainer}>
                    <View style={styles.totalsBox}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total HT</Text>
                            <Text style={styles.totalValue}>{invoice.totalHT || '0.00'} DA</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total TVA</Text>
                            <Text style={styles.totalValue}>{invoice.totalTVA || '0.00'} DA</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Remise</Text>
                            <Text style={styles.totalValue}>{invoice.discountAmount || '0.00'} DA</Text>
                        </View>
                        <View style={[styles.totalRow, styles.totalFinalRow]}>
                            <Text style={styles.totalFinalLabel}>TOTAL TTC</Text>
                            <Text style={styles.totalFinalValue}>{invoice.totalTTC} DA</Text>
                        </View>

                    </View>
                </View>



                {/* Signature Section */}
                <View style={styles.signatureSection}>
                    {/* // */}
                    <View style={styles.totalWords}>
                        <Text style={styles.letterTitle}>Total en lettre</Text>
                        <Text>{amountToFrenchWords(invoice.totalTTC)}</Text>
                    </View>
                    <View>
                        <Text style={styles.signatureTitle}>Signature</Text>

                    </View>
                </View>

            </Page>
        </Document>
    );
};