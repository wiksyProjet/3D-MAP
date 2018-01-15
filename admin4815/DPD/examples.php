<?php
/**
 * DPD France PHP examples
 *
 * @category   DPDFrance
 * @package    DPDFrance_SolutionWebmaster
 * @author     DPD S.A.S. <ensavoirplus.ecommerce@dpd.fr>
 * @copyright  2015 DPD S.A.S., société par actions simplifiée, au capital de 18.500.000 euros, dont le siège social est situé 27 Rue du Colonel Pierre Avia - 75015 PARIS, immatriculée au registre du commerce et des sociétés de Paris sous le numéro 444 420 830 
 * @license    http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

/* Init DPDFrance PHP Class */
require_once('classes/class-dpdfrance.php');

$run_example = 1;

/* Example 1 : Retrieve and display a list of Pickup points near an address.
 * Get the list of Pickup points near and address, HTML + CSS display buildup.
 * Mandatory params : address, zipcode, city
 */
if ($run_example == 1)
{
    $relais_list = DPDFrance::getPickupPoints('27 Rue du colonel pierre avia', '75015', 'Paris');

    /* Build display: call CSS and create div */
    $html = '<link rel="stylesheet" type="text/css" href="assets/css/dpdrelais.css" media="screen"/>
             <div id="dpdfrance_pickup">';
    
    /* Write each Pickup point */
    foreach ($relais_list as $offset => $pointRelais)
    {
        $html .= '
            <label>
                <div class="lignepr" id="lignepr'.$offset.'">
                    <div class"dpdrelais_logo" id="dpdrelais_logo"><img src="assets/img/pointrelais.png" alt="-" /></div>
                    <div class="dpdrelais_info" id="dpdrelais'.$offset.'_info"><strong>' . $pointRelais['shop_name'] . '</strong><br/>' . $pointRelais['address1'] . ' <br/> ' . $pointRelais['zipcode'] . ' ' . $pointRelais['city'] . '</div>
                    <div class="dpdrelais_radio"><input type="radio" name="dpdfrance_pickup" value="'.$pointRelais['relay_id'].'"></input></div>
                    <div class="dpdrelais_popup"><a href="http://www.dpd.fr/dpdrelais/id_'.$pointRelais['relay_id'].'" target="_blank">Plus de détails</a></div>
                    <div class="dpdrelais_distance">' . $pointRelais['distance'] . ' km  <br/> ID: ' . $pointRelais['relay_id'] . '</div>
                </div>
            </label>
        ';
    }
    
    /* Close div */
    $html .= '</div>';

    /* Display */
    echo $html;
    exit;
}


/* Example 2 : Validate a GSM number for Predict service.
 * This functions allows to check if the customer GSM number is OK, as it's needed for Predict service.
 * Mandatory params : GSM number, ISO country code.
 */
if ($run_example == 2)
{
    $gsm_to_test = DPDFrance::validatePredictGSM('0636656565', 'FR');
    if ($gsm_to_test == true)
        echo 'Votre numéro de téléphone est valide.'; /* Possible actions on success : display OK message, redirect to payment page ... */
    else
        echo 'Merci de renseigner un numéro de téléphone mobile français valide, sur 10 chiffres, commençant par 06 ou 07.'; /* Possible actions on failure : display error message ... */
}
    
    
/* Example 3 : Generate an interface file for DPD Station labelling software.
 * You should pass an array containing an array for each order. Let fields empty if not used.
 * Mandatory fields : order_reference, order_shipping_service, customer_first_name, customer_last_name, customer_zipcode, customer_city, customer_iso_code, customer_email.
 */
if ($run_example == 3)
{
    $orders =   array(
                    array(
                        'order_reference' => 'CMD20150325',                             // Mandatory
                        'order_weight' => '2',                                          // In kilograms
                        'order_amount' => '595',
                        'order_shipping_service' => 'predict',                          // Mandatory : predict, relais, or classic
                        'order_insurance_service' => '',                                // empty : default insurance service, 1 : ad valorem insurance service (extra cost)
                        'customer_first_name' => 'Odile',                               // Mandatory
                        'customer_last_name' => 'Deray',                                // Mandatory
                        'customer_company' => 'Red Is Dead',
                        'customer_address_1' => '27 Rue du Colonel Pierre Avia',        // Mandatory
                        'customer_address_2' => '',
                        'customer_zipcode' => '75015',                                  // Mandatory
                        'customer_city' => 'PARIS',                                     // Mandatory
                        'customer_iso_code' => 'FR',                                    // Mandatory : on 2 chars
                        'customer_telephone' => '0155443100',
                        'customer_mobile' => '0655443100',                              // Mandatory for Predict
                        'customer_email' => 'odile@redisdead.fr',                       // Mandatory
                        'customer_pickup_id' => 'P22957',                               // Mandatory for Relais service : Pxxxxx format
                        'shipper_name' => 'MONSHOPPING.COM',
                        'shipper_address_1' => '323 Av Denis Papin',
                        'shipper_address_2' => 'ZI Nord',
                        'shipper_zipcode' => '13340',
                        'shipper_city' => 'ROGNAC',
                        'shipper_telephone' => '0490450949',
                        'shipper_mobile' => '0690450949',
                        'shipper_email' => 'chargeur@dpd.fr',
                        'shipper_contract_number' => '12345',                           // Mandatory if you have multiple DPD contracts
                        'returns_service' => 'Prepared',
                    ),
                    array(
                        'order_reference' => 'CMD20150336',
                        'order_weight' => '1.5',
                        'order_amount' => '1200',
                        'order_shipping_service' => 'relais',
                        'order_insurance_service' => 1,
                        'customer_first_name' => 'Pascal',
                        'customer_last_name' => 'Paoli',
                        'customer_company' => '',
                        'customer_address_1' => '20 Cours Napoléon',
                        'customer_address_2' => '',
                        'customer_zipcode' => '20000',
                        'customer_city' => 'AJACCIO',
                        'customer_iso_code' => 'FR',
                        'customer_telephone' => '0494303020',
                        'customer_mobile' => '0688552200',
                        'customer_email' => 'paoli@figatelli.fr',
                        'customer_pickup_id' => 'P22957',
                        'shipper_name' => 'MONSHOPPING.COM',
                        'shipper_address_1' => '323 Av Denis Papin',
                        'shipper_address_2' => 'ZI Nord',
                        'shipper_zipcode' => '13340',
                        'shipper_city' => 'ROGNAC',
                        'shipper_telephone' => '0490450949',
                        'shipper_mobile' => '0690450949',
                        'shipper_email' => 'chargeur@dpd.fr',
                        'shipper_contract_number' => '12345',
                        'returns_service' => 'OnDemand',
                    ),
                );
    DPDStation::generateInterfaceFile($orders);
}
?>