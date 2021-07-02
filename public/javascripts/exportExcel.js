const btnHistory = document.querySelector('#btnExportHistory')
const btnCaNhan = document.querySelector('#btnExportCTSCaNhan')
const btnDoanhNghiep = document.querySelector('#btnExportCTSDoanhNghiep')
const tableHistory = document.querySelector('#tableHistory')
const tableCTSCaNhan = document.querySelector('#tableCTSCaNhan')
const tableCTSDoanhNghiep = document.querySelector('#tableCTSDoanhNghiep')
btnHistory.addEventListener('click',(e)=>{
    e.preventDefault()
    let table2excel = new Table2Excel()
    table2excel.defaultFileName = `Lịch sử MST`
    table2excel.export(tableHistory)
})
btnCaNhan.addEventListener('click',(e)=>{
    e.preventDefault()
    let table2excel = new Table2Excel()
    table2excel.defaultFileName = `CTS Cá Nhân - ${Date.now()}`
    table2excel.export(tableCTSCaNhan)
})
btnDoanhNghiep.addEventListener('click',(e)=>{
    e.preventDefault()
    let table2excel = new Table2Excel()
    table2excel.defaultFileName = `CTS Doanh Nghiệp - ${Date.now()}`
    table2excel.export(tableCTSDoanhNghiep)
})