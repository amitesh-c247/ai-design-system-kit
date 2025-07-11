// TODO: Implement COI hooks when services are available
// import { Coi } from "../../services/COI";
// import UtilLocalService from "../../utils/localService";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import {
//   COI_QUERY_KEYS,
//   COI_QUERY_GROUPS,
//   COI_STALE_TIMES,
//   COI_RETRY_CONFIG,
// } from "./constants";

// const coi = new Coi();
// const roles = UtilLocalService.getLocalStorage("roles");
// const isCarrierUser = roles?.includes("CARRIER"); // Simplified check

// ============================================================================
// CARRIER RELATED QUERIES
// ============================================================================

// export const useCarrierList = (params) =>
//   useQuery({
//     queryKey: [COI_QUERY_KEYS.CARRIER_LIST, params],
//     queryFn: () => coi.getCarriers(params),
//     staleTime: COI_STALE_TIMES.LISTING,
//     retry: COI_RETRY_CONFIG.DEFAULT.retries,
//   });

// export const useCarrierCOIsDetails = (params) =>
//   useQuery({
//     queryKey: [COI_QUERY_KEYS.CARRIER_DETAILS, params],
//     queryFn: () => coi.getCarrierDetails(params),
//     enabled: (!!params?.carrierId || isCarrierUser) && !!params?.policyId,
//     staleTime: COI_STALE_TIMES.DETAIL,
//   });

// ============================================================================
// COI RELATED QUERIES
// ============================================================================

// export const useCarrierCOIsList = (params) =>
//   useQuery({
//     queryKey: [COI_QUERY_KEYS.COIS_LIST, params],
//     queryFn: () => coi.getCOIsList(params),
//     staleTime: COI_STALE_TIMES.LISTING,
//   });

// export const useCarrierExpiredCOIsList = (params) =>
//   useQuery({
//     queryKey: [COI_QUERY_KEYS.COI_ARCHIVE, params],
//     queryFn: () => coi.getExpiredCOIsList(params),
//     enabled: !!params?.carrierId,
//     staleTime: COI_STALE_TIMES.LISTING,
//   });

// export const useCarrierExpiredTemplateList = (params) =>
//   useQuery({
//     queryKey: [COI_QUERY_KEYS.COI_ARCHIVE, params],
//     queryFn: () => coi.getExpiredTemplateList(params),
//     enabled: !!params?.carrierId,
//     staleTime: COI_STALE_TIMES.LISTING,
//   });

// export const useCOIPreviewDataById = (params) =>
//   useQuery({
//     queryKey: [COI_QUERY_KEYS.COIS_LIST, params],
//     queryFn: () => coi.getCOIPreviewDataById(params),
//     enabled: !!params?.certificateId,
//     staleTime: COI_STALE_TIMES.DETAIL,
//   });

// export const useGetCOIById = (params) =>
//   useQuery({
//     queryKey: [COI_QUERY_KEYS.COIS_LIST, params],
//     queryFn: () => coi.getCOIById(params),
//     enabled: !!params?.id,
//     staleTime: COI_STALE_TIMES.DETAIL,
//   });

// export const useCOIHistoryList = (params) =>
//   useQuery({
//     queryKey: [COI_QUERY_KEYS.COI_HISTORY, params],
//     queryFn: () => coi.getCoiHistory(params),
//     enabled: !!params?.policyId && !!params.coiId,
//     staleTime: COI_STALE_TIMES.DETAIL,
//   });

// ============================================================================
// COI MUTATIONS
// ============================================================================

// export const useSendCOIEmail = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: coi.sendCOIEmail,
//     onSuccess: () => {
//       // Invalidate all COI-related queries
//       COI_QUERY_GROUPS.COIS.forEach((key) => {
//         queryClient.invalidateQueries({ queryKey: [key] });
//       });
//     },
//   });
// };

// export const useAddEditCOI = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (payload) =>
//       payload?.id ? coi.updateCOI(payload) : coi.createCOI(payload),
//     onSuccess: () => {
//       // Invalidate all COI-related queries
//       COI_QUERY_GROUPS.COIS.forEach((key) => {
//         queryClient.invalidateQueries({ queryKey: [key] });
//       });
//     },
//   });
// };

// export const useDeleteCOIById = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: coi.deleteCOI,
//     onSuccess: () => {
//       // Invalidate all COI-related queries
//       COI_QUERY_GROUPS.COIS.forEach((key) => {
//         queryClient.invalidateQueries({ queryKey: [key] });
//       });
//     },
//   });
// };

// ============================================================================
// LIMITS/DEDUCTIBLES AND VERBIAGE QUERIES
// ============================================================================

// export const useLimitsAndDeductiblesList = (params) =>
//   useQuery({
//     queryKey: [COI_QUERY_KEYS.LIMITS_DETECTABLE, params],
//     queryFn: () => coi.getLimitsAndDeductiblesList(params),
//     staleTime: COI_STALE_TIMES.LISTING,
//   });

// export const useLimitsAndDeductible = ({ id, isVerbiageFilter }) => {
//   return useQuery({
//     queryKey: [COI_QUERY_KEYS.LIMIT_DEDUCTIBLE_DETAIL, id],
//     queryFn: () => coi.getLimitsAndDeductiblesById({ id, isVerbiageFilter }),
//     enabled: !!id,
//     staleTime: COI_STALE_TIMES.DETAIL,
//   });
// };

// export const useAddEditLimitsAndDeductibles = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (payload) => {
//       if (payload?.id) {
//         return coi.updateLimitsAndDeductibles(payload);
//       }
//       return coi.createLimitsAndDeductibles(payload);
//     },
//     onSuccess: () => {
//       // Invalidate all limits-related queries
//       COI_QUERY_GROUPS.LIMITS.forEach((key) => {
//         queryClient.invalidateQueries({ queryKey: [key] });
//       });
//     },
//   });
// };

// export const useDeleteDeductibleById = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: coi.deleteDeductibleById,
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: [COI_QUERY_KEYS.LIMITS_DETECTABLE],
//       });
//     },
//   });
// };

// ============================================================================
// TEMPLATE RELATED QUERIES
// ============================================================================

// export const useGetCOITemplatesListing = (params) =>
//   useQuery({
//     queryKey: [COI_QUERY_KEYS.CARRIER_COI_TEMPLATE, params],
//     queryFn: () => coi.getCOITemplatesListing(params),
//     enabled: !!params?.policyId && !!params.carrierId,
//     staleTime: COI_STALE_TIMES.TEMPLATE,
//   });

// export const useCarrierCOITemplate = (params) =>
//   useQuery({
//     queryKey: [COI_QUERY_KEYS.CARRIER_COI_TEMPLATE, params],
//     queryFn: () => coi.getCarrierCOITemplate(params),
//     enabled:
//       (!!params?.templateId && !!params?.carrierId) ||
//       (isCarrierUser && !!params?.policyId),
//     staleTime: COI_STALE_TIMES.TEMPLATE,
//   });

// export const useCarrierCOITemplateMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (payload) => {
//       if (payload.id) {
//         return coi.updateCarrierCOITemplate(payload);
//       } else {
//         return coi.createCarrierCOITemplate(payload);
//       }
//     },
//     onSuccess: () => {
//       // Invalidate all template-related queries
//       COI_QUERY_GROUPS.TEMPLATES.forEach((key) => {
//         queryClient.invalidateQueries({ queryKey: [key] });
//       });
//     },
//   });
// };

// export const useDeleteCOITemplateById = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: coi.deleteCOITemplateById,
//     onSuccess: () => {
//       // Invalidate all template-related queries
//       COI_QUERY_GROUPS.TEMPLATES.forEach((key) => {
//         queryClient.invalidateQueries({ queryKey: [key] });
//       });
//     },
//   });
// };

// export const useArchiveTemplateById = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: coi.archiveTemplateById,
//     onSuccess: () => {
//       // Invalidate all template-related queries
//       COI_QUERY_GROUPS.TEMPLATES.forEach((key) => {
//         queryClient.invalidateQueries({ queryKey: [key] });
//       });
//     },
//   });
// };

// export const useDuplicateTemplateById = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: coi.duplicateTemplateById,
//     onSuccess: () => {
//       // Invalidate all template-related queries
//       COI_QUERY_GROUPS.TEMPLATES.forEach((key) => {
//         queryClient.invalidateQueries({ queryKey: [key] });
//       });
//     },
//   });
// };

// ============================================================================
// POLICY RELATED QUERIES
// ============================================================================

// export const useGetPolicyTrucks = (params) => {
//   return useQuery({
//     queryKey: [COI_QUERY_KEYS.POLICY_TRUCKS, params],
//     queryFn: () => coi.getPolicyTrucks(params),
//     enabled: !!params?.policyId,
//     staleTime: COI_STALE_TIMES.LISTING,
//   });
// };

// export const useCarrierPolicyLimits = (params) =>
//   useQuery({
//     queryKey: [COI_QUERY_KEYS.CARRIER_POLICY_LIMITS, params],
//     queryFn: () => coi.getCarrierPolicyLimits(params),
//     enabled: !!params?.policyId,
//     staleTime: COI_STALE_TIMES.LISTING,
//   });

// ============================================================================
// AGENT RELATED QUERIES
// ============================================================================

// export const useAgentSignatoryDetail = (params) =>
//   useQuery({
//     queryKey: [COI_QUERY_KEYS.AGENT_SIGNATORY_DETAILS, params],
//     queryFn: () => coi.getAgentSignatoryDetail(params),
//     enabled: !!params?.agentId,
//     staleTime: COI_STALE_TIMES.DETAIL,
//   });
