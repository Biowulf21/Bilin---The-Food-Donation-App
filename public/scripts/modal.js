//Donation form
var modalWrap = null;
const showEventDetails = () => {
    if(modalWrap !== null){
        modalWrap.remove();
    }

    modalWrap = document.createElement('div');
    modalWrap.innerHTML = `
        <div class="modal fade" tabindex="-1">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" style="font-weight: bolder;">Donate food for this event</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <p style="font-weight: bold;">WHEN WOULD YOU LIKE TO DELIVER YOUR DONATION?</p>
                            <div class="row">
                                <div class="col">
                                    <p style="font-weight: bold;">Date</p>
                                    <input type="date">
                                </div>
                                <div class="col">
                                    <p style="font-weight: bold;">Time</p>
                                    <input type="time">
                                </div>
                            </div>
                        </div>
                        <div>
                            <p style="font-weight: bold;">FOOD DONATION DETAILS</p>
                            <div>
                                <p style="font-weight: bold;">Food to donate:</p>
                                <textarea rows="3"  placeholder="Add description"></textarea>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p style="font-weight: bold;">Number of people donation will serve</p>
                                <input type="number" class="col-2" placeholder="0">
                            </div>
                            <div class="d-flex justify-content-between">
                                <p style="font-weight: bold;">Food is individually portioned and packaged</p>
                                <label><input type="radio" name="optionsRadios" id="optionsRadios1" value="option1">Yes</label>
                                <label><input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">No</label>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div>
                                    <p style="font-weight: bold;">Food Expiry Date</p>
                                    <input type="date">
                                </div>
                                <div>
                                    <p style="font-weight: bold;">Food Freshness</p>
                                    <input type="range" id="range" min="0" max="5">
                                </div>
                            </div>
                            <div>
                                <p style="font-weight: bold;">REASON FOR DONATION</p>
                                <div class="row d-flex justify-content-between">
                                    <div class="col">
                                        <label><input type="checkbox" value="">Close to expiration</label>
                                        <label><input type="checkbox" value="">Rejected by Customer</label>
                                        <label><input type="checkbox" value="">Promotion/Marketing</label>
                                    </div>
                                    <div class="col">
                                        <label><input type="checkbox" value="">Excess Inventory</label>
                                        <label><input type="checkbox" value="">Labeling Error/Change</label>
                                        <label><input type="checkbox" value="">Damaged</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p style="font-weight: bold;">UPLOAD PHOTOS</p>
                                <input type="file" class="form-control" id="inputGroupFile01">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btns bg-color3 text-color2">SUBMIT</button>
                    </div>
                </div>
            </div>
        </div>
    `;

document.body.append(modalWrap);
var modal = new bootstrap.Modal(modalWrap.querySelector(`.modal`));
modal.show();
}