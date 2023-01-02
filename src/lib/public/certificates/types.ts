/**
 * The page data for the certificate page.
 */
export interface CertificatePageData {
  certificate: Certificate;
  releases: Release[];
}

/**
 * An interface for a certificate object showing the accomplishments that a particular user has made in the duration of two releases.
 */
export interface Certificate {
  /** The pull requests that the user has made. */
  merged: PR[];

  /** There release which the certificate starts from. */
  from: {
    tagName: string;
    date: string;
  };

  /** There release which the certificate ends at. */
  to: {
    tagName: string;
    date: string;
  };

  /**
   * The user who the certificate is for.
   */
  user: {
    login: string;
    name: string;
    bio: string;
    url: string;
    picture: string;
  };
}

/**
 * An interface for a pull request object.
 */
export interface PR {
  number: number;
  title: string;
  mergedAt: string;
  url: string;
  commits: {
    message: string;
    url: string;
  }[];
}

/**
 * An interface for a release object.
 */
export interface Release {
  name: string;
  createdAt: string;
  tagName: string;
}
