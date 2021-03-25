/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props: any) => (
  <div tw="flex mx-auto max-w-prose">
    <ContentLoader
      speed={2}
      height={200}
      viewBox="0 0 400 200"
      backgroundColor="#f95d93"
      foregroundColor="#ecebeb"
      {...props}
      style={{
        margin: 'auto',
        width: '100%',
      }}
    >
      <circle cx="26" cy="31" r="15" />
      <rect x="58" y="26" rx="2" ry="2" width="240" height="10" />
      <rect x="11" y="58" rx="2" ry="2" width="430" height="88" />
    </ContentLoader>
  </div>
);

export default MyLoader;
