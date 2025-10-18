import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  discount_percentage: number;
  category_id: string | null;
  is_featured: boolean;
  is_active: boolean;
  gst_status: string | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon_name: string | null;
  display_order: number;
}

export interface VoucherDenomination {
  id: string;
  brand_id: string;
  value: number;
  is_available: boolean;
  display_order: number;
}

export const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("brands")
        .select("*")
        .eq("is_active", true)
        .order("name");
      
      if (error) throw error;
      return data as Brand[];
    },
  });
};

export const useBrand = (slug: string) => {
  return useQuery({
    queryKey: ["brand", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("brands")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();
      
      if (error) throw error;
      return data as Brand;
    },
    enabled: !!slug,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("display_order");
      
      if (error) throw error;
      return data as Category[];
    },
  });
};

export const useVoucherDenominations = (brandId: string) => {
  return useQuery({
    queryKey: ["voucher-denominations", brandId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("voucher_denominations")
        .select("*")
        .eq("brand_id", brandId)
        .eq("is_available", true)
        .order("display_order");
      
      if (error) throw error;
      return data as VoucherDenomination[];
    },
    enabled: !!brandId,
  });
};
