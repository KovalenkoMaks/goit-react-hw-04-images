// Компонент спінера відображається, доки відбувається завантаження зображень. Використовуйте будь-який готовий компонент, наприклад react-loader-spinner або будь-який інший.https://github.com/mhnpd/react-loader-spinner
import { Blocks } from 'react-loader-spinner';
export default function Loader() {
  return (
    <Blocks
      visible={true}
      height="40"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
    />
  );
}
