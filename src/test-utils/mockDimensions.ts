let mockDimensions = { width: 375, height: 812 };

export const mockSetDimensions = (dims: { width: number; height: number }) => {
  mockDimensions = dims;
};

export const mockGetDimensions = () => mockDimensions;
