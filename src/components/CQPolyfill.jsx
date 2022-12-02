import CQpolifillJS from 'file-loader?name=[name].[ext]!../static/container-query-polyfill.modern';

const ContainerQueriesPolyfill = () => {
  return <script src={CQpolifillJS}></script>;
};

export default ContainerQueriesPolyfill;
