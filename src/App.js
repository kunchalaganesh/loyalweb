/* eslint-disable */

import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import AdminHome from "./Components/Pages/AdminPanel/AdminHome/AdminHome";
import AdminPanelLogin from "./Components/Pages/AdminPanel/AdminPanelLogin/AdminPanelLogin";
import AdminAddCategory from "./Components/Pages/AdminPanel/AdminMasters/AdminAddCategory";
import AdminAddProductType from "./Components/Pages/AdminPanel/AdminMasters/AdminAddProductType";
import AdminAddCollection from "./Components/Pages/AdminPanel/AdminMasters/AdminAddCollection";
import AdminAddPurity from "./Components/Pages/AdminPanel/AdminMasters/AdminAddPurity";
import AdminAddBox from "./Components/Pages/AdminPanel/AdminMasters/AdminAddBox";
import AdminInventory from "./Components/Pages/AdminPanel/AdminEcommerce/AdminInventory";
import AdminAddBulkProducts from "./Components/Pages/AdminPanel/AdminEcommerce/AdminAddBulkProducts";
import AdminInvoice from "./Components/Pages/AdminPanel/AdminTrading/AdminInvoice";
import AdminAllCustomers from "./Components/Pages/AdminPanel/AdminEcommerce/AdminAllCustomers";
import AdminRates from "./Components/Pages/AdminPanel/AdminSettings/AdminRates";
import AdminAllOrders from "./Components/Pages/AdminPanel/AdminEcommerce/AdminAllOrders";
import ProductDetails from "./Components/Pages/AdminPanel/AdminEcommerce/ProductDetails";
import AdminAllUnlabelledList from "./Components/Pages/AdminPanel/AdminEcommerce/AdminAllUnlabelledList";
import AdminPurchase from "./Components/Pages/AdminPanel/AdminTrading/AdminPurchase";
import AdminInvoiceEdit from "./Components/Pages/AdminPanel/AdminTrading/AdminInvoiceEdit";
import AdminAddEmployee from "./Components/Pages/AdminPanel/AdminMasters/AdminAddEmployee";
import AdminSaleReport from "./Components/Pages/AdminPanel/AdminReports/AdminSaleReport";
import AdminCreditNote from "./Components/Pages/AdminPanel/AdminEcommerce/AdminCreditNote";
import AdminPurchaseEntry from "./Components/Pages/AdminPanel/AdminTrading/AdminPurchaseEntry";
import AdminPurchasePayments from "./Components/Pages/AdminPanel/AdminTrading/AdminPurchasePayments";
import AdminAddStone from "./Components/Pages/AdminPanel/AdminMasters/AdminAddStone";
import AdminAddSku from "./Components/Pages/AdminPanel/AdminMasters/AdminAddSku";
import AdminLedgerMain from "./Components/Pages/AdminPanel/AdminAccounts/AdminLedgerMain";
import AdminSupplierAllPayments from "./Components/Pages/AdminPanel/AdminAccounts/Extra Pages/AdminSupplierAllPayments";
import AdminInvoicePayments from "./Components/Pages/AdminPanel/AdminTrading/AdminInvoicePayments";
import AdminDebitNote from "./Components/Pages/AdminPanel/AdminEcommerce/AdminDebitNote";
import AdminStockReport from "./Components/Pages/AdminPanel/AdminReports/AdminStockReport";
import CategoryNew from "./Components/Pages/AdminPanel/AdminEcommerce/CategoryNew";
import AdminCashReport from "./Components/Pages/AdminPanel/AdminReports/AdminCashReport";
import ExcelImport from "./Components/Other Functions/ExcelImport";
import InvoiceCustomization from "./Components/Other Functions/InvoiceCustomization";
import GSHome from "./Components/Pages/GoldString/GSHome/GSHome";
import GSClientOnboarding from "./Components/Pages/GoldString/GSClientOnboarding/GSClientOnboarding";
import AdminAddCompany from "./Components/Pages/AdminPanel/AdminMasters/AdminAddCompany";
import AdminAddBranch from "./Components/Pages/AdminPanel/AdminMasters/AdminAddBranch";
import AdminAddCounter from "./Components/Pages/AdminPanel/AdminMasters/AdminAddCounter";
import AdminAddDepartment from "./Components/Pages/AdminPanel/AdminMasters/AdminAddDepartment";
import AdminAddRoles from "./Components/Pages/AdminPanel/AdminMasters/AdminAddRoles";
import AdminAddEmployees from "./Components/Pages/AdminPanel/AdminMasters/AdminAddEmployees";
import AdminAddBanks from "./Components/Pages/AdminPanel/AdminMasters/AdminAddBanks";
import AdminAddDevices from "./Components/Pages/AdminPanel/AdminMasters/AdminAddDevices";
import AdminAddTax from "./Components/Pages/AdminPanel/AdminMasters/AdminAddTax";
import AdminAddRateCoversion from "./Components/Pages/AdminPanel/AdminMasters/AdminAddRateConversion";
import AdminAddProduct from "./Components/Pages/AdminPanel/AdminMasters/AdminAddProduct";
import AdminAddDesign from "./Components/Pages/AdminPanel/AdminMasters/AdminAddDesign";
import AdminAddOccassion from "./Components/Pages/AdminPanel/AdminMasters/AdminAddOccassion";
import AdminAddVendor from "./Components/Pages/AdminPanel/AdminMasters/AdminAddVendor";
import AdminPurchaseEntryEdit from "./Components/Pages/AdminPanel/AdminTrading/AdminPurchaseEntryEdit";
import AdminCreatePacket from "./Components/Pages/AdminPanel/AdminTrading/AdminCreatePacket";
import AdminVendorTounche from "./Components/Pages/AdminPanel/AdminSettings/AdminVendorTounche";
import AdminAddDiamond from "./Components/Pages/AdminPanel/AdminMasters/AdminAddDiamond";
import AdminAddDiamondSizeWeightRate from "./Components/Pages/AdminPanel/AdminMasters/AdminAddDiamondSizeWeightRate";
import AdminDiamondAttribtes from "./Components/Pages/AdminPanel/AdminSettings/AdminDiamondAttribtes";
import AdminPairCustomerVendor from "./Components/Pages/AdminPanel/AdminSettings/AdminPairCustomerVendor";
import AdminCustomerTounche from "./Components/Pages/AdminPanel/AdminSettings/AdminCustomerTounche";
import AdminAddSingleStock from "./Components/Pages/AdminPanel/AdminTrading/AdminAddSingleStock";
import AdminCustomerSlab from "./Components/Pages/AdminPanel/AdminSettings/AdminCustomerSlab";
import AdminCustomerRateOfInterest from "./Components/Pages/AdminPanel/AdminSettings/AdminCustomerRateOfInterest";
import AdminCreditPeriod from "./Components/Pages/AdminPanel/AdminSettings/AdminCreditPeriod";
import AdminOldStockReport from "./Components/Pages/AdminPanel/AdminReports/AdminOldStockReport";
import AdminAddBulkStockNew from "./Components/Pages/AdminPanel/AdminEcommerce/AdminAddBulkStockNew";
import AdminSkuKarigarWiseReport from "./Components/Pages/AdminPanel/AdminReports/AdminSkuKarigarWiseReport";
import AdminSkuReport from "./Components/Pages/AdminPanel/AdminReports/AdminSkuReport";
import AdminVendorLedger from "./Components/Pages/AdminPanel/AdminTrading/AdminVendorLedger";
import AdminCustomerLedger from "./Components/Pages/AdminPanel/AdminTrading/AdminCustomerLedger";
import AdminAddPacketMaster from "./Components/Pages/AdminPanel/AdminMasters/AdminAddPacketMaster";

function App() {
  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  console.log(adminLoggedIn, "adminLoggedIn");
  let isAuthenticated = "";
  if (adminLoggedIn.Clients) {
    isAuthenticated = true;
    // if (adminLoggedIn.toString() === "1") {
    //   isAuthenticated = true;
  } else if (adminLoggedIn.toString() === "2") {
    isAuthenticated = true;
  } else if (adminLoggedIn.toString() === "3") {
    isAuthenticated = true;
  } else if (adminLoggedIn.toString() === "4") {
    isAuthenticated = true;
  } else if (adminLoggedIn.StatusType === true) {
    isAuthenticated = true;
  } else isAuthenticated = false;

  console.log(isAuthenticated, "isAuthenticated");
  console.log(isAuthenticated, "isAuthenticated");
  const userDetails = allStates.reducer1;

  const navigate = useNavigate();

  // Use useEffect to navigate to the '/' route when the component mounts
  useEffect(() => {
    // navigate("/adminpanellogin");
    navigate("/gshome");
  }, []);

  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<AdminPanelLogin />}></Route>*/}
        <Route path="/" element={<GSHome />}></Route>
        <Route path="/adminpanellogin" element={<AdminPanelLogin />}></Route>
        <Route
          path="/adminhome"
          element={isAuthenticated ? <AdminHome /> : <AdminPanelLogin />}
        ></Route>
        <Route
          path="/add_category"
          element={isAuthenticated ? <AdminAddCategory /> : <AdminPanelLogin />}
        ></Route>
        <Route
          path="/add_employee"
          element={isAuthenticated ? <AdminAddEmployee /> : <AdminPanelLogin />}
        ></Route>
        <Route
          path="/add_product_type"
          element={
            isAuthenticated ? <AdminAddProductType /> : <AdminPanelLogin />
          }
        ></Route>
        <Route
          path="/add_collection"
          element={
            isAuthenticated ? <AdminAddCollection /> : <AdminPanelLogin />
          }
        ></Route>
        <Route
          path="/add_purity"
          element={isAuthenticated ? <AdminAddPurity /> : <AdminPanelLogin />}
        ></Route>
        <Route
          path="/add_box"
          element={isAuthenticated ? <AdminAddBox /> : <AdminPanelLogin />}
        ></Route>

        <Route
          path="/add_customer"
          element={
            isAuthenticated ? <AdminAllCustomers /> : <AdminPanelLogin />
          }
        ></Route>
        <Route
          path="/add_stone"
          element={isAuthenticated ? <AdminAddStone /> : <AdminPanelLogin />}
        ></Route>
        <Route
          path="/add_sku"
          element={isAuthenticated ? <AdminAddSku /> : <AdminPanelLogin />}
        ></Route>

        <Route
          path="/inventory"
          element={isAuthenticated ? <AdminInventory /> : <AdminPanelLogin />}
        ></Route>
        <Route
          path="/purchase"
          element={isAuthenticated ? <AdminPurchase /> : <AdminPanelLogin />}
        ></Route>
        <Route
          path="/purchase_entry"
          element={
            isAuthenticated ? <AdminPurchaseEntry /> : <AdminPanelLogin />
          }
        ></Route>
        <Route
          path="/ledger_main"
          element={isAuthenticated ? <AdminLedgerMain /> : <AdminPanelLogin />}
        ></Route>
        <Route
          path="/unlabelled_list"
          element={
            isAuthenticated ? <AdminAllUnlabelledList /> : <AdminPanelLogin />
          }
        ></Route>
        <Route
          path="/add_bulk_product"
          element={
            isAuthenticated ? <AdminAddBulkProducts /> : <AdminPanelLogin />
          }
        ></Route>
        <Route
          path="/add_rates"
          element={isAuthenticated ? <AdminRates /> : <AdminPanelLogin />}
        ></Route>
        <Route
          path="/admin_invoice"
          element={isAuthenticated ? <AdminInvoice /> : <AdminPanelLogin />}
        ></Route>
        <Route
          path="/admin_invoice_edit"
          element={isAuthenticated ? <AdminInvoiceEdit /> : <AdminPanelLogin />}
        ></Route>
        <Route
          path="/admin_orders"
          element={isAuthenticated ? <AdminAllOrders /> : <AdminPanelLogin />}
        ></Route>
        <Route
          path="/product_details"
          element={isAuthenticated ? <ProductDetails /> : <AdminPanelLogin />}
        ></Route>
        <Route
          path="/admin_sale_report"
          element={isAuthenticated ? <AdminSaleReport /> : <AdminPanelLogin />}
        ></Route>
        <Route
          path="/credit_note"
          element={isAuthenticated ? <AdminCreditNote /> : <AdminPanelLogin />}
        ></Route>
        <Route
          path="/debit_note"
          element={isAuthenticated ? <AdminDebitNote /> : <AdminPanelLogin />}
        ></Route>
        <Route
          path="/purchase_payments"
          element={
            isAuthenticated ? <AdminPurchasePayments /> : <AdminPanelLogin />
          }
        ></Route>
        <Route
          path="/receive_payments"
          element={
            isAuthenticated ? <AdminInvoicePayments /> : <AdminPanelLogin />
          }
        ></Route>
        <Route
          path="/supplier_allpayments"
          element={
            isAuthenticated ? <AdminSupplierAllPayments /> : <AdminPanelLogin />
          }
        ></Route>
        <Route
          path="/stock_report"
          element={isAuthenticated ? <AdminStockReport /> : <AdminPanelLogin />}
        ></Route>
        <Route
          path="/old_stock_report"
          element={
            isAuthenticated ? <AdminOldStockReport /> : <AdminPanelLogin />
          }
        ></Route>
        <Route
          path="/cash_report"
          element={isAuthenticated ? <AdminCashReport /> : <AdminPanelLogin />}
        ></Route>
        <Route
          path="/category_new"
          element={isAuthenticated ? <CategoryNew /> : <AdminPanelLogin />}
        ></Route>
        <Route
          path="/import_excel"
          element={isAuthenticated ? <ExcelImport /> : <AdminPanelLogin />}
        ></Route>
        <Route
          path="/invoice_customisation"
          element={
            isAuthenticated ? <InvoiceCustomization /> : <AdminPanelLogin />
          }
        ></Route>
        <Route
          path="/gshome"
          element={isAuthenticated ? <GSHome /> : <GSHome />}
        ></Route>
        <Route
          path="/client_onboarding"
          element={<GSClientOnboarding />}
        ></Route>
        <Route path="/add_company" element={<AdminAddCompany />}></Route>
        <Route path="/add_branch" element={<AdminAddBranch />}></Route>
        <Route path="/add_counter" element={<AdminAddCounter />}></Route>
        <Route path="/add_department" element={<AdminAddDepartment />}></Route>
        <Route path="/add_roles" element={<AdminAddRoles />}></Route>
        <Route path="/add_employees" element={<AdminAddEmployees />}></Route>
        <Route path="/add_banks" element={<AdminAddBanks />}></Route>
        <Route path="/add_devices" element={<AdminAddDevices />}></Route>
        <Route path="/add_tax" element={<AdminAddTax />}></Route>
        <Route path="/add_rate" element={<AdminAddRateCoversion />}></Route>
        <Route path="/add_product" element={<AdminAddProduct />}></Route>
        <Route path="/add_design" element={<AdminAddDesign />}></Route>
        <Route path="/add_occassion" element={<AdminAddOccassion />}></Route>
        <Route path="/add_vendor" element={<AdminAddVendor />}></Route>
        <Route path="/add_diamond" element={<AdminAddDiamond />}></Route>
        <Route
          path="/add_diamond_attributes"
          element={<AdminDiamondAttribtes />}
        ></Route>
        <Route path="/create_packet" element={<AdminCreatePacket />}></Route>
        <Route
          path="/add_diamond_size_weight_rate"
          element={<AdminAddDiamondSizeWeightRate />}
        ></Route>
        <Route path="/add_packet" element={<AdminAddPacketMaster />}></Route>
        <Route
          path="/purchase_entry_edit"
          element={<AdminPurchaseEntryEdit />}
        ></Route>
        <Route path="/vendor_tounche" element={<AdminVendorTounche />}></Route>
        <Route
          path="/customer_tounche"
          element={<AdminCustomerTounche />}
        ></Route>
        <Route
          path="/pair_customer_vendor"
          element={<AdminPairCustomerVendor />}
        ></Route>
        <Route
          path="/add_single_stock"
          element={<AdminAddSingleStock />}
        ></Route>
        <Route path="/customer_slab" element={<AdminCustomerSlab />}></Route>
        <Route
          path="/customer_rate_of_interest"
          element={<AdminCustomerRateOfInterest />}
        ></Route>
        <Route
          path="/customer_credit_period"
          element={<AdminCreditPeriod />}
        ></Route>
        <Route
          path="/add_bulk_stock_new"
          element={<AdminAddBulkStockNew />}
        ></Route>
        <Route
          path="/admin_sku_karigar_wise_report"
          element={<AdminSkuKarigarWiseReport />}
        ></Route>
        <Route path="/admin_sku_report" element={<AdminSkuReport />}></Route>
        <Route
          path="/admin_vendor_ledger"
          element={<AdminVendorLedger />}
        ></Route>
        <Route
          path="/admin_customer_ledger"
          element={<AdminCustomerLedger />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
