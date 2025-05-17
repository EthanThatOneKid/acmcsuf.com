/**
 * PR is an interface for a GitHub PR.
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
 * Issue is an interface for a GitHub issue.
 */
export interface Issue {
  number: number;
  title: string;
  url: string;
  openedAt: string;
}

/**
 * An interface for a release object.
 */
export interface Release {
  name: string;
  createdAt: string;
  tagName: string;
}

/**
 * ReleaseCertificatePageData is page data for the certificate page.
 */
export interface ReleaseCertificatePageData {
  certificate: ReleaseCertificate;
}

/**
 * ReleaseCertificate is a certificate showing the accomplishments that a particular user has made in the duration of two releases.
 */
export interface ReleaseCertificate {
  /**
   * merged are the PRs that the user has made.
   */
  merged: PR[];

  /**
   * from is the release which the certificate starts from.
   */
  from: {
    tagName: string;
    date: string;
  };

  /**
   * to is the release which the certificate ends at.
   */
  to: {
    tagName: string;
    date: string;
  };

  /**
   * user who the certificate is for.
   */
  user: {
    login: string;
    name: string;
    bio: string;
    url: string;
    picture: string;
  };

  /**
   * releases are the other releases that the user contributed to.
   */
  releases: Release[];
}

/**
 * RepositoryCertificatePageData is page data for the repository certificate page.
 */
export interface RepositoryCertificatePageData {
  certificate: RepositoryCertificate;
}

/**
 * RepositoryCertificate is a certificate showing the accomplishments that a particular user has made in the duration of two releases.
 */
export interface RepositoryCertificate
  extends Pick<ReleaseCertificate, "merged" | "user"> {
  /**
   * repositoryName is the name of the repository.
   */
  repositoryName: string;

  /**
   * issues are the issues that the user has made.
   */
  issues: Issue[];
}
