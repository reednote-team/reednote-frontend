import qrcode from 'qrcode-generator'
import { Ref } from 'vue';

const useQRCode = (theRef: Ref<null | HTMLElement>, data: string): void => {

  const typeNumber = 4;
  const errorCorrectionLevel = 'L';
  const qr = qrcode(typeNumber, errorCorrectionLevel);
  qr.addData(data);
  qr.make();

  if (theRef.value) {
    theRef.value.innerHTML = qr.createImgTag();
  }

}

export default useQRCode